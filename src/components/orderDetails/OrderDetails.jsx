// OrderDetails.js
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Link, useLocation } from "react-router-dom";
import "../orderDetails/OrderDetails.css";
import { Button } from "antd";

const OrderDetails = () => {
  const { state } = useLocation();
  const [orderNumber, setOrderNumber] = useState("");

  useEffect(() => {
    setOrderNumber(uuidv4().split("-")[0].toUpperCase());
  }, []);

  // Debug state to ensure data is received
  console.log("Location state:", state);

  // Check if state.cart is an object and has items
  const cart = state?.cart && typeof state.cart === "object" ? state.cart : {};
  const totalPrice = state?.totalPrice || 0;

  if (Object.keys(cart).length === 0) {
    return <div>No order details available.</div>;
  }

  return (
    <div className="order-details">
      <h1>Order Details</h1>
      <p>
        Order Number: <strong>{orderNumber}</strong>
      </p>
      <ul>
        {Object.values(cart).map((item, index) => (
          <li key={index}>
            {item.name} - Quantity: {item.quantity} - Price: ${item.price}
          </li>
        ))}
      </ul>
      <h3>Total Price: ${totalPrice}</h3>

      <Button>
        <Link to={"/home"}>Click here to move on home page</Link>
      </Button>
    </div>
  );
};

export default OrderDetails;
