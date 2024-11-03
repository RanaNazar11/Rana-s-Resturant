import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore"; // Import Firestore functions
import { auth, db } from "../../firebase/firebaseConfig"; // Ensure db is imported from your Firebase config
import "./login-register.css";
import email_icon from "../../assets/images/email.png";
import password_icon from "../../assets/images/password.png";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Clear any previous errors

    try {
      // Sign in the user
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Reference to the user's document in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userDocSnap = await getDoc(userDocRef);

      if (!userDocSnap.exists()) {
        // If user does not have a document, create one with default data
        await setDoc(userDocRef, {
          email: user.email,
          displayName: user.displayName || "Anonymous", // Use a placeholder if displayName is not set
          role: "user", // Default role
          createdAt: new Date().toISOString(), // Store the date of account creation
        });
      }

      toast.success("Login Successfully");
      navigate("/home"); // Navigate to a secure route after login
    } catch (err) {
      toast.error("Invalid email or password");
    }
  };

  return (
    <div className="containers">
      <div className="row">
        <div className="col">
          <div className="header">
            <div className="text mt-0">Login</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleLogin}>
            <div className="inputs">
              <div className="input">
                <img src={email_icon} alt="Email Icon" />
                <input
                  placeholder="Enter email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="input">
                <img src={password_icon} alt="Password Icon" />
                <input
                  placeholder="Enter password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="submit submit-container">
              <button className="submit">Login</button>
            </div>
          </form>
        </div>
      </div>
      <div className="forgot-password">
        Forgot password? <Link to={"/forgot-password"}>Click here!!</Link>
      </div>
      <div className="new-user">
        New User?{" "}
        <span>
          <Link to={"/register"}>Click here to Register</Link>
        </span>
      </div>
    </div>
  );
};

export default Login;
