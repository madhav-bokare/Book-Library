import React, { useMemo } from "react";
import { Link } from "react-router-dom";
import "../CSS/Section.css";

const Section = ({ query = "", allBooks = [] }) => {
  // Categories
  const categories = useMemo(() => {
    const map = {};
    allBooks.forEach(book => {
      const cat = book.category?.toLowerCase() || "others";
      if (!map[cat]) map[cat] = [];
      map[cat].push(book);
    });
    return map;
  }, [allBooks]);

  // Search results
  const searchResults = useMemo(() => {
    if (!query) return [];
    return allBooks.filter(b => b.title?.toLowerCase().includes(query.toLowerCase()));
  }, [allBooks, query]);

  // Card component
  const BookCard = ({ book }) => (
    <div className="card">
      <Link to={book.link === "paid" ? `/paid-book/${encodeURIComponent(book.title)}` : `/book/${encodeURIComponent(book.title)}`}>
        <img src={book.img || "/default.jpg"} alt={book.title} />
      </Link>
      <p className="book-name">{book.title}</p>
      {book.link === "paid" && (
        <Link to={`/paid-book/${encodeURIComponent(book.title)}`}>
          <button className="purchase-btn-nav">Purchase</button>
        </Link>
      )}
    </div>
  );

  // Render Cards
  const renderCards = items => (
    <div className="card-container">
      {items.map(book => <BookCard key={book._id} book={book} />)}
    </div>
  );

  // Render
  if (query) {
    return (
      <section className="section search-section">
        <h2>Search Results</h2>
        {searchResults.length > 0 ? renderCards(searchResults) : <p>No results found</p>}
      </section>
    );
  }

  return Object.keys(categories).map(cat => (
    <section key={cat}>
      <h2 className="cardHeading">{cat.charAt(0).toUpperCase() + cat.slice(1)}</h2>
      {renderCards(categories[cat])}
    </section>
  ));
};

export default Section;
