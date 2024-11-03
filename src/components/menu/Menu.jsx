import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Input, message } from "antd";
import {
  ShoppingCartOutlined,
  DeleteOutlined,
  EditOutlined,
} from "@ant-design/icons";
import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../firebase/firebaseConfig";

import Baklava from "../../assets/images/baklava.jpg";
import Brownie from "../../assets/images/brownie.jpg";
import Cake from "../../assets/images/cake.jpg";
import CreamBrulee from "../../assets/images/cream-brulee.jpg";
import Macaron from "../../assets/images/macaron.jpg";
import Meringue from "../../assets/images/meringue.jpg";
import PannaCotta from "../../assets/images/panna-cotta.jpg";
import Tiramisu from "../../assets/images/tiramisu.jpg";
import Waffle from "../../assets/images/waffle.jpg";
import { useNavigate } from "react-router-dom";

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const initialItems = [
  {
    image: Baklava,
    category: "Baklava",
    name: "Waffle with Berries",
    price: "4.00",
  },
  {
    image: Brownie,
    category: "Brownie",
    name: "Salted Caramel Brownie",
    price: "5.50",
  },
  { image: Cake, category: "Cake", name: "Red Velvet Cake", price: "4.50" },
  {
    image: CreamBrulee,
    category: "Creme Brulee",
    name: "Vanilla Bean Creme Brulee",
    price: "7.00",
  },
  {
    image: Macaron,
    category: "Macaron",
    name: "Macaron Mix of Five",
    price: "8.00",
  },
  {
    image: Meringue,
    category: "Pie",
    name: "Lemon Meringue Pie",
    price: "5.00",
  },
  {
    image: PannaCotta,
    category: "Panna Cotta",
    name: "Vanilla Panna Cotta",
    price: "6.50",
  },
  {
    image: Tiramisu,
    category: "Tiramisu",
    name: "Classic Tiramisu",
    price: "5.50",
  },
  {
    image: Waffle,
    category: "Waffle",
    name: "Waffle with Berries",
    price: "6.50",
  },
];

const MenuList = () => {
  const [showModal, setShowModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [items, setItems] = useState([]);
  const [newItem, setNewItem] = useState({
    image: "",
    category: "",
    name: "",
    price: "",
  });
  const [cart, setCart] = useState({}); // Change cart to an object
  const [currentItem, setCurrentItem] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const itemsCollection = collection(db, "menuItems");
        const itemsSnapshot = await getDocs(itemsCollection);
        const itemsList = itemsSnapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        if (itemsList.length === 0) {
          await Promise.all(
            initialItems.map(async (item) => {
              await addDoc(itemsCollection, item);
            })
          );
          setItems(initialItems);
        } else {
          setItems(itemsList);
        }
      } catch (error) {
        console.error("Error fetching items:", error);
      }
    };

    fetchItems();
  }, []);

  const handleShow = () => setShowModal(true);
  const handleClose = () => {
    setShowModal(false);
    setNewItem({ image: "", category: "", name: "", price: "" });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewItem((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    try {
      const docRef = await addDoc(collection(db, "menuItems"), {
        ...values,
        image: newItem.image,
      });
      setItems([...items, { ...values, image: newItem.image, id: docRef.id }]);
      message.success("Item added successfully!");
      handleClose();
    } catch (error) {
      console.error("Error adding item:", error);
      message.error("Failed to add item. Try again.");
    }
  };

  const handleDelete = async (itemId) => {
    try {
      await deleteDoc(doc(db, "menuItems", itemId));
      setItems(items.filter((item) => item.id !== itemId));
      message.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error deleting item:", error);
      message.error("Failed to delete item. Try again.");
    }
  };

  const handleUpdateClick = (item) => {
    setCurrentItem(item);
    setNewItem({
      image: item.image,
      category: item.category,
      name: item.name,
      price: item.price,
    });
    setShowUpdateModal(true);
  };

  const handleUpdateSubmit = async (values) => {
    try {
      await updateDoc(doc(db, "menuItems", currentItem.id), {
        ...values,
        image: newItem.image || currentItem.image,
      });
      setItems((prevItems) =>
        prevItems.map((item) =>
          item.id === currentItem.id
            ? { ...item, ...values, image: newItem.image || item.image }
            : item
        )
      );
      message.success("Item updated successfully!");
      setShowUpdateModal(false);
      setNewItem({ image: "", category: "", name: "", price: "" });
    } catch (error) {
      console.error("Error updating item:", error);
      message.error("Failed to update item. Try again.");
    }
  };

  const handleAddToCart = (item) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[item.name]) {
        newCart[item.name].quantity += 1; // Increase quantity if item already exists
      } else {
        newCart[item.name] = { ...item, quantity: 1 }; // Add new item with quantity
      }
      return newCart;
    });
    message.success(`${item.name} added to cart`);
  };

  const handleRemoveFromCart = (itemToRemove) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[itemToRemove.name]) {
        newCart[itemToRemove.name].quantity -= 1; // Decrease quantity
        if (newCart[itemToRemove.name].quantity === 0) {
          delete newCart[itemToRemove.name]; // Remove item if quantity is zero
        }
      }
      return newCart;
    });
    message.success(`${itemToRemove.name} removed from cart`);
  };

  const totalPrice = Object.values(cart)
    .reduce((total, item) => total + parseFloat(item.price) * item.quantity, 0)
    .toFixed(2);

  const handleBuyNow = () => {
    message.success("Proceeding to checkout!");
    navigate("/order-details", {
      state: { cart, totalPrice },
    });
    // Implement your checkout logic here
  };

  return (
    <div className="py-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-8">
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <h1>Menu</h1>
              <Button type="primary" className="m-2" onClick={handleShow}>
                Add Item
              </Button>
            </div>
            <div className="row row-cols-1 row-cols-md-3 g-4">
              {items.map((item) => (
                <div className="col" key={item.id}>
                  <div className="card h-100 border-0">
                    <div style={{ position: "relative" }}>
                      <img
                        src={item.image}
                        className="card-img-top item-image"
                        alt={`${item.category}-image`}
                        style={{ borderRadius: "10px", height: "250px" }}
                      />
                      <Button
                        type="primary"
                        icon={<ShoppingCartOutlined />}
                        style={{
                          borderRadius: "20px",
                          width: "50%",
                          position: "absolute",
                          right: "65px",
                          bottom: "-15px",
                        }}
                        onClick={() => handleAddToCart(item)}
                      >
                        Add to Cart
                      </Button>
                      <Button
                        type="text"
                        icon={<DeleteOutlined />}
                        style={{
                          position: "absolute",
                          left: "10px",
                          top: "10px",
                          color: "red",
                        }}
                        onClick={() => handleDelete(item.id)}
                      />
                      <Button
                        type="text"
                        icon={<EditOutlined />}
                        style={{
                          position: "absolute",
                          left: "40px",
                          top: "10px",
                          color: "blue",
                        }}
                        onClick={() => handleUpdateClick(item)}
                      />
                    </div>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">
                        {item.category} - ${item.price}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="col-12 col-md-4">
            <h2>Cart</h2>
            {Object.entries(cart).map(([itemName, item]) => (
              <div
                key={itemName}
                style={{ display: "flex", justifyContent: "space-between" }}
              >
                <span>
                  {itemName} x {item.quantity}
                </span>
                <Button
                  type="link"
                  danger
                  icon={<DeleteOutlined />}
                  onClick={() => handleRemoveFromCart(item)}
                />
              </div>
            ))}
            <h4>Total: ${totalPrice}</h4>
            <Button
              type="primary"
              onClick={handleBuyNow}
              disabled={totalPrice === "0.00"}
            >
              Buy Now
            </Button>
          </div>
        </div>
      </div>
      <Modal
        title="Add Item"
        visible={showModal}
        onCancel={handleClose}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleSubmit}>
          <Form.Item label="Image" required>
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
          </Form.Item>
          <Form.Item label="Category" required>
            <Input
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Name" required>
            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Price" required>
            <Input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form>
      </Modal>
      <Modal
        title="Update Item"
        visible={showUpdateModal}
        onCancel={() => setShowUpdateModal(false)}
        footer={null}
      >
        <Form layout="vertical" onFinish={handleUpdateSubmit}>
          <Form.Item label="Image" required>
            <Input type="file" onChange={handleImageUpload} accept="image/*" />
          </Form.Item>
          <Form.Item label="Category" required>
            <Input
              value={newItem.category}
              onChange={(e) =>
                setNewItem({ ...newItem, category: e.target.value })
              }
            />
          </Form.Item>
          <Form.Item label="Name" required>
            <Input
              value={newItem.name}
              onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
            />
          </Form.Item>
          <Form.Item label="Price" required>
            <Input
              type="number"
              value={newItem.price}
              onChange={(e) =>
                setNewItem({ ...newItem, price: e.target.value })
              }
            />
          </Form.Item>
          <Button type="primary" htmlType="submit">
            Update
          </Button>
        </Form>
      </Modal>
    </div>
  );
};

export default MenuList;
