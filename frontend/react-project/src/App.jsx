import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import User from "./Components/User/User";
// import Admin from "./Components/Admin/Admin";
import BookDetail from "./Components/User/BookDetail";
import Admin from './Components/Admin/Admin';
import AddBook from './Components/Admin/AddBook';
import './App.css'

const App = () => {

  const handleAddBook = async (formData) => {
    const config = {
      method: 'POST',
      body: formData
    };

    try {
      const response = await fetch('http://localhost:5000/api/books', config);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      // Assuming there's a way to update the books list in Admin component
    } catch (error) {
      console.error('Error:', error);
    }
  };
  return (
    <>

    <Router>
        <ul className="ulList">
            <li><Link to='/user'>User</Link></li>
            <li><Link to='/admin'>Admin</Link></li>
        </ul>
        <Routes>
            <Route path="/user" element={<User></User>}></Route>
         

            <Route path="/books/:id" element={<BookDetail/>} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/admin/add-book" element={<AddBook addBook={handleAddBook} />} />
        </Routes>
    </Router>
     
   
    </>
  );
};

export default App;
