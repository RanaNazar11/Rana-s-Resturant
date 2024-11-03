import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig"; // Import Firebase config
import user_icon from "../../assets/images/person.png";
import email_icon from "../../assets/images/email.png";
import password_icon from "../../assets/images/password.png";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Clear previous errors

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Register Successfully");
      navigate("/login"); // Redirect to login page after successful registration
    } catch (err) {
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <div className="containers">
      <div className="row">
        <div className="col">
          <div className="header">
            <div className="text">Register</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleRegister}>
            <div className="inputs">
              <div className="input">
                <img src={user_icon} alt="" />
                <input
                  placeholder="Enter name"
                  type="text"
                  name="Full Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <img src={email_icon} alt="" />
                <input
                  placeholder="Enter email"
                  type="email"
                  name="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="" />
                <input
                  placeholder="Enter password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="submit submit-container">
              <button className="submit" type="submit">
                Register
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="already-user">
        Already a user? <Link to={"/login"}>Click here to Login!</Link>
      </div>
    </div>
  );
};

export default Register;
