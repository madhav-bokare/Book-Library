// src/components/Profile.jsx
import React, { useMemo, useCallback } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Profile.css";
import userIcon from "../images/UserLogo.png";
import Navbar from "../components/Navbar";

const Profile = () => {
  const navigate = useNavigate();

  //  Memoized localStorage reads
  const { user, purchasedBooks, readBooks } = useMemo(() => {
    return {
      user: JSON.parse(localStorage.getItem("user")),
      purchasedBooks: JSON.parse(localStorage.getItem("purchasedBooks")) || [],
      readBooks: JSON.parse(localStorage.getItem("readBooks")) || [],
    };
  }, []);

  //  Stable logout function
  const logout = useCallback(() => {
    localStorage.clear();
    navigate("/login", { replace: true });
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="profile-page">
        <h1 className="profile-heading">Profile</h1>

        <div className="profile-info">
          <img
            src={userIcon}
            alt="User"
            className="profile-user-icon"
            loading="lazy"
          />
          <p><strong>Name:</strong> {user?.name || "User"}</p>
          <p><strong>Email:</strong> {user?.email || "Not Available"}</p>
          <button className="logout-btn" onClick={logout}>Logout</button>
        </div>

        {/* ===== Purchased Books ===== */}
        <div className="books-section">
          <h2>Purchased Books ({purchasedBooks.length})</h2>

          {purchasedBooks.length ? (
            <div className="books-grid">
              {purchasedBooks.map(book => (
                <div key={book._id} className="book-card">
                  <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                    <img
                      src={book.img || "/default.jpg"}
                      alt={book.title}
                      loading="lazy"
                    />
                  </Link>
                  <p>{book.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No purchased books yet.</p>
          )}
        </div>

        {/* ===== Read Books ===== */}
        <div className="books-section">
          <h2>Read Books ({readBooks.length})</h2>

          {readBooks.length ? (
            <div className="books-grid">
              {readBooks.map(book => (
                <div key={book._id} className="book-card">
                  <Link
                    to={
                      book.link === "paid"
                        ? `/paid-book/${encodeURIComponent(book.title)}`
                        : `/book/${encodeURIComponent(book.title)}`
                    }
                  >
                    <img
                      src={book.img || "/default.jpg"}
                      alt={book.title}
                      loading="lazy"
                    />
                  </Link>
                  <p>{book.title}</p>
                </div>
              ))}
            </div>
          ) : (
            <p>No books read yet.</p>
          )}
        </div>
      </div>

      <div className="back-button">
        <Link to="/" className="back-name">⬅ Back to Home</Link>
      </div>
    </>
  );
};

export default Profile;