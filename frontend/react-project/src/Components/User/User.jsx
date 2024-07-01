import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./User.css";

const User = () => {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    fetchBooks();
  }, []);
  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  return (
    <div className="userDashboard">
      <h1>User Dashboard</h1>
      <table className="userTable">
        <thead>
          <tr>
            <th>Title</th>
            <th>Author</th>
            <th>Type of Book</th>
            <th>Genre</th>
            <th>Pages</th>
            <th>Price</th>
            <th>Publication</th>
          
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.type}</td>
              <td>{book.genre}</td>
              <td>{book.pages}</td>
              <td>{book.price}</td>

              <td>{book.publication}</td>
          
              <td>
                <Link to={`/books/${book._id}`}>View</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default User;
