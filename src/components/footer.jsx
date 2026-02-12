import React from "react";
import { Link } from "react-router-dom";
import "../CSS/Footer.css"

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section about">
          <h2 className="footer-section-about-h2">About Book World</h2>
          <p className="footer-section-about-p">
            Book World brings you the ultimate collection of popular, trending,
            and most-loved books. Stay connected and explore new adventures every day!
          </p>
        </div>

        <div className="footer-section links">
          <h2 className="footer-section-about-h2">Quick Links</h2>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/free-books">Free Books</Link></li>
            <li><Link to="/paid-books">Paid Books</Link></li>
            <li><Link to="/contact">Contact Us</Link></li>
          </ul>
        </div>

        <div className="footer-section social">
          <h2 className="footer-section-about-h2">Follow Us</h2>
          <div className="social-icons">
            <p><i className="fab fa-facebook-f"></i> Facebook</p><br />
            <p><i className="fab fa-instagram"></i> Instagram</p><br />
            <p><i className="fab fa-twitter"></i> Twitter</p><br />
            <p><i className="fab fa-youtube"></i> YouTube</p>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p className="footer-bottom-a">
          &copy; 2025 Book World. All Rights Reserved.
        </p>
      </div>

      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css"
      />
    </footer>
  );
};

export default Footer;
