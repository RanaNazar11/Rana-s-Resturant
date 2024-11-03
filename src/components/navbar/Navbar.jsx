// Navbar.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { app } from "../../firebase/firebaseConfig"; // Import your Firebase configuration

const Navbar = () => {
  const [user, setUser] = useState(null);
  const auth = getAuth(app);

  // Monitor authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [auth]);

  // Logout functionality
  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  // Conditional Navbar items based on authentication state
  const navList = (
    <ul className="navbar-nav mb-2 mb-lg-0 d-flex align-items-center justify-content-center">
      <li className="nav-item">
        <Link className="nav-link text-white" to={"/home"}>
          Home
        </Link>
      </li>
      <li className="nav-item">
        <Link to={"/menu"} className="nav-link text-white">
          Menu
        </Link>
      </li>

      {user ? (
        <li className="nav-item">
          <button
            className="nav-link text-white btn btn-link"
            onClick={handleLogout}
          >
            Logout
          </button>
        </li>
      ) : (
        <>
          <li className="nav-item">
            <Link to={"/register"} className="nav-link text-white">
              Register
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/login"} className="nav-link text-white">
              Login
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  return (
    <nav
      style={{ backgroundColor: "#003161" }}
      className="navbar navbar-expand-lg sticky-top"
    >
      <div className="container-fluid">
        <Link className="navbar-brand me-auto" to={"/home"}>
          <h2 className="fw-bold text-white m-0">Rana's Restaurant</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div
          className="collapse navbar-collapse justify-content-center"
          id="navbarNav"
        >
          {navList}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
