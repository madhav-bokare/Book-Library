import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import "./naveContent.css";
import Navbar from "../Navbar.jsx";

const FreeBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://book-library-backend-qnfv.onrender.com/api/book/free");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch free books:", err);
      }
    };
    fetchBooks();
  }, []);

  // 🔍 Search Logic (same as Section.jsx)
  const searchResults = useMemo(() => {
    if (!query) return books;
    return books.filter(book =>
      book.title?.toLowerCase().includes(query.toLowerCase())
    );
  }, [books, query]);

  return (
    <>
      {/* Navbar ko query aur setter pass karo */}
      <Navbar query={query} setQuery={setQuery} />

      <section className="book-section">
        <h2 className="section-heading">
          {query ? "Search Results" : "Free Books"}
        </h2>

        <div className="card-grid">
          {searchResults.length > 0 ? (
            searchResults.map(book => (
              <div key={book._id} className="book-card">
                <Link to={`/book/${encodeURIComponent(book.title)}`}>
                  <img src={book.img} alt={book.title} className="book-img" />
                </Link>
                <p className="book-title">{book.title}</p>
              </div>
            ))
          ) : (
            <p>No results found</p>
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

export default FreeBooks;
