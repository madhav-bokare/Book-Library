import React, { useEffect, useState, useMemo } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Navbar.jsx";
import "./naveContent.css";

const FreeBooks = () => {
  const [books, setBooks] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await fetch("https://book-library-backend-flame.vercel.app/api/book/free");
        const data = await res.json();
        setBooks(data);
      } catch (err) {
        console.error("Failed to fetch free books:", err);
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
        <h2 className="section-heading">{query ? "Search Results" : "Free Books"}</h2>
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
            <p className="no-data">No results found</p>
          )}
        </div>
      </section>
    </>
  );
};

export default FreeBooks;