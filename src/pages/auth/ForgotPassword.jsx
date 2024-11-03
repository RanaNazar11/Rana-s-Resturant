import React, { useState } from "react";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase/firebaseConfig";
import toast from "react-hot-toast";
import email_icon from "../../assets/images/email.png";
import { Link } from "react-router-dom";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please enter your email address");
      return;
    }

    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.error("Error sending password reset email:", error);
      toast.error("Failed to send password reset email. Please try again.");
    }
  };

  return (
    <div className="containers">
      <div className="row">
        <div className="col">
          <div className="header">
            <div className="text">Forgot Password</div>
            <div className="underline"></div>
          </div>
          <form onSubmit={handleForgotPassword}>
            <div className="inputs">
              <div className="input">
                <img src={email_icon} alt="Email Icon" />
                <input
                  placeholder="Enter your email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>
            <div className="back-to-login">
              Remember your password?{" "}
              <Link to={"/login"}>Go back to Login</Link>
            </div>
            <div className="submit submit-container">
              <button type="submit" className="submit">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
