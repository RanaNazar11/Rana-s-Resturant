import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebookF,
  faTwitter,
  faGoogle,
  faInstagram,
  faLinkedinIn,
  faGithub,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer
      style={{ backgroundColor: "#003161" }}
      className=" text-center text-white mt-auto py-3"
    >
      <div className="container p-2">
        {/* Social Media Links */}
        <section className="mb-2">
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1 "
            style={{ backgroundColor: "#3b5998" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebookF} />
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            style={{ backgroundColor: "#55acee" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            style={{ backgroundColor: "#dd4b39" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGoogle} />
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            style={{ backgroundColor: "#ac2bac" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} />
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            style={{ backgroundColor: "#0082ca" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedinIn} />
          </a>
          <a
            className="btn btn-link btn-floating btn-lg text-white m-1"
            style={{ backgroundColor: "#333333" }}
            href="#!"
            role="button"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </section>
      </div>

      {/* Copyright */}
      <div style={{ backgroundColor: "#003161" }} className="text-center p-3">
        © 2024. All Rights Reserved.
      </div>
    </footer>
  );
};

export default Footer;
