import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Admin.css";

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    _id: "",
    title: "",
    author: "",
    type: "",
    genre: "",
    publication: "",
    pages: "",
    price: "",
    coverPhotoUrl: "",
    active: true,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/books/all");
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    
    if ((name === "pages" || name === "price") && parseInt(value) < 0) {
      return; 
    }

    setCurrentBook({ ...currentBook, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(currentBook),
    };

    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${currentBook._id}`,
        config
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the books state after successful edit
      const updatedBook = await response.json();
      const updatedBooks = books.map((book) =>
        book._id === currentBook._id ? updatedBook : book
      );

      setBooks(updatedBooks);
      setIsEditing(false);
      setCurrentBook({
        _id: "",
        title: "",
        author: "",
        type: "",
        genre: "",
        publication: "",
        pages: "",
        price: "",
        coverPhotoUrl: "",
        active: true, // Reset to active for new book edits
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const toggleActiveState = async (bookId, currentState) => {
    try {
      const response = await fetch(
        `http://localhost:5000/api/books/${bookId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ active: !currentState }),
        }
      );
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      // Update the books state after successful toggle
      const updatedBook = await response.json();
      const updatedBooks = books.map((book) =>
        book._id === bookId ? updatedBook : book
      );

      setBooks(updatedBooks);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="userDashboard">
      <h1>Admin Dashboard</h1>
      <div className="Addbookbtn">
        <Link to="/admin/add-book">
          <button className="addbookBtn">Add New Book</button>
        </Link>
      </div>

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
            <th>Active</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book._id}>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="text"
                    name="title"
                    value={currentBook.title}
                    onChange={handleChange}
                  />
                ) : (
                  book.title
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="text"
                    name="author"
                    value={currentBook.author}
                    onChange={handleChange}
                  />
                ) : (
                  book.author
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <select
                    name="type"
                    value={currentBook.type}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Poems">Poems</option>
                    <option value="Novel">Novel</option>
                    <option value="Stories">Stories</option>
                    <option value="Auto-biography">Auto-biography</option>
                  </select>
                ) : (
                  book.type
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <select
                    name="genre"
                    value={currentBook.genre}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select Genre</option>
                    <option value="History">History</option>
                    <option value="Science">Science</option>
                    <option value="Arts">Arts</option>
                    <option value="Science Fiction">Science Fiction</option>
                  </select>
                ) : (
                  book.genre
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="text"
                    name="pages"
                    value={currentBook.pages}
                    onChange={handleChange}
                  />
                ) : (
                  book.pages
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="text"
                    name="price"
                    value={currentBook.price}
                    onChange={handleChange}
                  />
                ) : (
                  book.price
                )}
              </td>
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="text"
                    name="publication"
                    value={currentBook.publication}
                    onChange={handleChange}
                  />
                ) : (
                  book.publication
                )}
              </td>
              <td>{book.active ? "Active" : "Inactive"}</td>
              <td style={{ textAlign: "center" }}>
                {isEditing && currentBook._id === book._id ? (
                  <>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button onClick={() => handleEdit(book)}>Edit</button>
                    <button
                      onClick={() => toggleActiveState(book._id, book.active)}
                    >
                      {book.active ? "Deactivate" : "Activate"}
                    </button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;