import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "../CSS/buyBook.css";

const PaidBookDetail = () => {
    const { title } = useParams();
    const [book, setBook] = useState(null);

    useEffect(() => {
        fetch("https://book-library-backend-qnfv.onrender.com/api/book/paid")
            .then(res => res.json())
            .then(data => {
                const found = data.find(
                    b => b.title.toLowerCase().trim() === decodeURIComponent(title).toLowerCase().trim()
                );
                setBook(found);
            })
            .catch(err => {
                console.error(err);
                setBook(null);
            });
    }, [title]);

    if (!book) return <p style={{ textAlign: "center", marginTop: "2rem" }}>Paid book not found</p>;

    return (
        <section style={{ textAlign: "center", padding: "2rem" }}>
            <h2 className="book-title-buy">{book.title}</h2>
            <img src={book.img} alt={book.title} style={{ width: "200px", height: "300px", objectFit: "cover" }} />
            <p>Price: ₹{book.price}</p>
            <button
                className="buy-button"
                onClick={() => alert(`You bought "${book.title}" for ₹${book.price}`)}>
                Confirm Purchase
            </button>
            <div style={{ marginTop: "1rem" }}>
                <Link to="/" className="back-name">⬅ Back to Home</Link>
            </div>
        </section>
    );
};

export default PaidBookDetail;
