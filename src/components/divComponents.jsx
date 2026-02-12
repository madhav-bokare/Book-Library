import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../CSS/DivComponents.css";
import Navbar from "./Navbar.jsx";

const DivComponents = () => {
  const { title } = useParams();
  const [book, setBook] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  // ===== FETCH CURRENT BOOK =====
  useEffect(() => {
    const fetchBook = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/book/title/${encodeURIComponent(title)}`
        );
        setBook(res.data);
        setError("");

        // Fetch suggestions (same type: free/paid, exclude current)
        const type = res.data.link; // free or paid
        const sugRes = await axios.get(`http://localhost:5000/api/book/${type}`);
        const filtered = sugRes.data.filter(b => b._id !== res.data._id);
        setSuggestions(filtered);
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
               rel="nonowner northerner"
                className="read-btn"
              >
                Open in Full Screen
              </a>
            )}
          </div>
        </div>

        {/* ===== PDF Viewer ===== */}
        <div className="book-content">
          <h2 className="book-content-header">Book Content</h2>
          {book.content && (
            <iframe src={book.content} title={book.title}></iframe>
          )}
        </div>

        {/* ===== Suggestions Section ===== */}
        {suggestions.length > 0 && (
          <div className="suggestions-section">
            <h2 className="book-content-header">
              Other {book.link === "free" ? "Free" : "Paid"} Books
            </h2>

            <div className="card-container">
              {suggestions.map(item => (
                <div key={item._id} className="card">
                  <Link
                    to={
                      item.link === "paid"
                        ? `/paid-book/${encodeURIComponent(item.title)}`
                        : `/book/${encodeURIComponent(item.title)}`
                    }
                  >
                    <img src={item.img || "/default.jpg"} alt={item.title} />
                  </Link>

                  <p className="book-name-div">{item.title}</p>

                  {item.link === "paid" && (
                    <Link
                      to={`/paid-book/${encodeURIComponent(item.title)}`}
                    >
                      <button className="buy-btn">Buy Now</button>
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ===== Back Button FIXED ===== */}
        <div className="back-button">
                 <Link to="/" className="back-name">
                   ⬅ Back to Home
                 </Link>
               </div>
      </div>
    </>
  );
};

export default DivComponents;