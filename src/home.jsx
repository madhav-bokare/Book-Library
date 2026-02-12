import React, { useEffect, useState, useMemo } from "react";
import axios from "axios";
import Navbar from "./components/Navbar.jsx";
import Section from "./components/Section.jsx";
import Footer from "./components/Footer.jsx";
import "./CSS/Responsive.css";

const Home = () => {
  const [query, setQuery] = useState("");
  const [fetchedBook, setFetchedBook] = useState([]);
  const [paidBook, setPaidBook] = useState([]);

  // Token check
  useEffect(() => {
    if (!localStorage.getItem("token")) window.location.href = "/login";
  }, []);

  // Fetch Free + Paid Books in parallel
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const [freeRes, paidRes] = await Promise.all([
          axios.get("https://book-library-backend-flame.vercel.app/api/book/free"),
          axios.get("https://book-library-backend-flame.vercel.app/api/book/paid"),
        ]);
        setFetchedBook(freeRes.data);
        setPaidBook(paidRes.data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchBooks();
  }, []);

  // Combine all books for search
  const allBooks = useMemo(() => [...fetchedBook, ...paidBook], [fetchedBook, paidBook]);

  return (
    <>
      <Navbar setQuery={setQuery} />
      <Section query={query} allBooks={allBooks} />
      <Footer />
    </>
  );
};

export default Home;