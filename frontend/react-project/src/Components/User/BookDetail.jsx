// BookDetails.jsx

import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import "./BookDetail.css"

const BookDetail = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetchBookDetails();
  }, []);

  const fetchBookDetails = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/books/${id}`);
      const data = await response.json();
      setBook(data);
    } catch (error) {
      console.error("Error fetching book details:", error);
    }
  };

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="bookDetail">
      <h2>Book Details</h2>
      <div className="bookdetailInfo">
      <div className="bookDetailRight">
        <p>Title: {book.title}</p>
        <p>Author: {book.author}</p>
        <p>Type: {book.type}</p>
        <p>Genre: {book.genre}</p>
        <p>Pages: {book.pages}</p>
        <p>Price: {book.price}</p>
        <p>Publication: {book.publication}</p>
        {/* <p>Activate</p> */}
      </div>
      <div className="bookDetailImg">
        {book.coverPhotoUrl && (
          <img
            src={`http://localhost:5000/${book.coverPhotoUrl}`}
            alt={book.title}
            className="bookImg"
          />
        )}
      </div>
      </div>




      <div className="BookDetailLink">
        <Link to="/user">Back </Link>
      </div>
    </div>
  ); 
};

export default BookDetail;
