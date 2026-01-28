import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./naveContent.css"; 
import Navbar from "../Navbar.jsx";

const PaidBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://book-library-backend-qnfv.onrender.com/api/book/paid");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    };
    fetchBooks();
  }, []);

  // Search logic
  const searchResults = useMemo(() => {
    if (!query) return books;
    return books.filter(book =>
      book.title?.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, query]);

  return (
    <>
      <Navbar query={query} setQuery={setQuery} />

      <section className="book-section">
        <h2 className="section-heading">
          {query ? "Search Results" : "Paid Books"}
        </h2>

        <div className="card-grid">
          {searchResults.length > 0 ? (
            searchResults.map(book => (
              <div key={book._id} className="book-card">
                {/* Link to purchase page using title */}
                <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                  <img src={book.img} alt={book.title} className="book-img" />
                </Link>
                <div className="book-info">
                  <p className="book-title">{book.title}</p>
                   <p className="book-price">₹{book.price}</p>
                  <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                    <button className="buy-btn">Buy Now</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No results found</p>
          )}
        </div>

        <div className="back-button">
          <Link to="/" className="back-name">
            ⬅ Back to Home
          </Link>
        </div>
      </section>
    </>
  );
};

export default PaidBooks;
