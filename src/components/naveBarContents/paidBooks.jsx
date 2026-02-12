import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import "./naveContent.css";

const PaidBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/book/paid");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch paid books:", err);
      }
    };
    fetchBooks();
  }, []);

  const searchResults = useMemo(() => {
    if (!query) return books;
    return books.filter(book =>
      book.title?.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, query]);

  return (
    <>
      <Navbar setQuery={setQuery} query={query} />
      <section className="book-section">
        <h2 className="section-heading">{query ? "Search Results" : "Paid Books"}</h2>
        <div className="card-grid">
          {searchResults.length > 0 ? (
            searchResults.map(book => (
              <div key={book._id} className="book-card">
                <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                  <img src={book.img} alt={book.title} className="book-img" />
                </Link>
                <div className="book-info">
                  <p className="book-title">{book.title}</p>
                  <p className="book-price">₹{book.price}</p>
                  <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
                    <button className="purchase-btn-nav">Purchase</button>
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <p className="no-data">No results found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default PaidBooks;
