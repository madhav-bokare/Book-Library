import React from "react";
import { Link, useLocation } from "react-router-dom";
import "../CSS/Navbar.css";
import UserLogo from "../images/UserLogo.png";


const Navbar = ({ setQuery = () => {} }) => {
  const location = useLocation();

  return (
    <>
    {/* Desktop / Tablet Links */}
   <nav className="navbar">
  <div className="logo">✦ Books Library</div>
  
    <div className="nav-links">
      <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
        Home
      </Link>
      <Link
        to="/free-books"
        className={location.pathname === "/free-books" ? "active-link" : ""}
      >
        Free Books
      </Link>
      <Link
        to="/paid-books"
        className={location.pathname === "/paid-books" ? "active-link" : ""}
      >
        Paid Books
      </Link>
    </div>

    <div className="search-container">
      <input
        type="search"
        placeholder="Search..."
        onChange={(e) => setQuery(e.target.value)}
      />
    </div>

    <Link
      to="/profile"
      className={location.pathname === "/profile" ? "active-link" : ""}
    >
      <img src={UserLogo} alt="Profile" className="user-icon" />
    </Link>
</nav>
{/* Mobile Navbar */}
      <nav className="navbar-mobile">
      <div className="mobile-top">
        <div className="mobile-logo">✦ Books Library</div>
        <div className="mobile-search-container">
          <input
            type="search"
            placeholder="Search..."
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <Link
        to="/profile"
         className={location.pathname === "/profile" ? "active-link" : ""}
       >
        <img src={UserLogo} alt="Profile" className="mobile-user-icon" />
       </Link>
      </div>

      {/* Buttons row: Free / Paid */}
      <div className="mobile-links">
  
          <Link to="/" className={location.pathname === "/" ? "active-link" : ""}>
            Home
          </Link>
        <Link
          to="/free-books"
          className={location.pathname === "/free-books" ? "active-link" : ""}
        >
          Free Books
        </Link>
        <Link
          to="/paid-books"
          className={location.pathname === "/paid-books" ? "active-link" : ""}
        >
          Paid Books
        </Link>
      </div>
    </nav>
    </>
  );
};

export default Navbar;