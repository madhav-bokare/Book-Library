import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../CSS/DivComponents.css";
import Navbar from "./Navbar.jsx";

const DivComponents = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [error, setError] = useState("");

  // ===== MOBILE SCROLL FIX =====
  useEffect(() => {
    const handleTouchStart = () => {
      // optional logic
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    return () => {
      window.removeEventListener("touchstart", handleTouchStart, { passive: true });
    };
  }, []);

  // ===== FETCH BOOK =====
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `https://book-library-backend-qnfv.onrender.com/api/book/title/${encodeURIComponent(title)}`
        );
        setBook(res.data);
        setError("");
      } catch (err) {
        console.error(err);
        setError("Book not found");
      }
    };
    fetchBook();
  }, [title]);

  if (error) return <p className="error">{error}</p>;
  if (!book) return <p className="loading">Loading...</p>;

  return (
    <>
      <Navbar />

      <div className="book-details">
        {/* ===== Book Header ===== */}
        <div className="book-header">
          <img src={book.img} alt={book.title} className="book-image" />

          <div className="book-info">
            <h1 className="book-info-h">{book.title}</h1>
            <p className="book-info-p">Category: {book.category}</p>
            <p className="book-info-p">
              Type: <strong>{book.link === "free" ? "Free" : "Paid"}</strong>
            </p>

            {book.content && (
              <a
                href={book.content}
                target="_blank"
                rel="noopener noreferrer"
                className="read-btn"
              >
                 Open in Full Screen
              </a>
            )}
          </div>
        </div>

        {/* ===== PDF Viewer ===== */}
        <div className="book-content">
          <h2>Book Content</h2>
          {book.content && (
            <iframe
              src={book.content}
              title={book.title}
            ></iframe>
          )}
        </div>

        {/* ===== Back Button FIXED ===== */}
        <div className="back-btn-container">
          <Link to="/" className="back-home">
            ⬅ Back to Home
          </Link>
        </div>
      </div>
    </>
  );
};

export default DivComponents;
