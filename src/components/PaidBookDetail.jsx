import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import "../CSS/PaidBookDetail.css";
import Navbar from "./Navbar.jsx";

const PaidBookDetail = () => {
  const { title } = useParams();

  const [book, setBook] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchBookAndSuggestions = async () => {
      try {
        // 🔹 Single book
        const res = await axios.get(
          `http://localhost:5000/api/book/title/${encodeURIComponent(title)}`
        );

        if (res.data.link !== "paid") {
          setError("This is not a paid book");
          return;
        }

        setBook(res.data);

        // 🔹 Suggestions (same type books)
        const sugRes = await axios.get(
          `http://localhost:5000/api/book/paid`
        );

        const filtered = sugRes.data.filter(
          item => item.title !== res.data.title
        );

        setSuggestions(filtered.slice(0, 6));
      } catch (err) {
        console.error(err);
        setError("Paid book not found");
      }
    };

    fetchBookAndSuggestions();
  }, [title]);

  if (error) {
    return (
      <>
        <Navbar />
        <p className="error-text">{error}</p>
        <Link to="/" className="back-name">⬅ Back to Home</Link>
      </>
    );
  }

  if (!book) {
    return (
      <>
        <Navbar />
        <p className="loading-text">Loading paid book...</p>
      </>
    );
  }

  return (
    <>
      <Navbar />

      {/* ===== BOOK DETAIL SECTION ===== */}
      <div className="purchase-container">
        {/* Left */}
        <div className="paid-book-image">
          <img src={book.img} alt={book.title} />
        </div>

        {/* Middle */}
        <div className="book-info">
          <h1>{book.title}</h1>
          <p className="category">Category: {book.category}</p>

          <p className="price">₹{book.price}</p>
          <p className="available">Available</p>
        </div>

        {/* Right */}
        <div className="purchase-box">
          <p className="box-price">₹{book.price}</p>
          <button
            className="purchase-btn"
            onClick={() =>
              alert(`You bought "${book.title}" for ₹${book.price}`)
            }
          >
            Purchase
          </button>

          <button className="details-btn">Details</button>
        </div>
      </div>

      {/* ===== SUGGESTIONS SECTION ===== */}
     {suggestions.length > 0 && (
              <div className="suggestions-section">
                <h2 className="paid-book-content-header">
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
    
                      <p className="book-name">{item.title}</p>
    
                      {item.link === "paid" && (
                        <Link
                          to={`/paid-book/${encodeURIComponent(item.title)}`}
                        >
                          <button className="purchase-btn">Purchase</button>
                        </Link>
                      )}
                    </div>
                  ))}
             </div>
         </div>
      )}
    </>
  );
};

export default PaidBookDetail;