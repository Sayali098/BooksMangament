


// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import './Admin.css';

// const Admin = () => {
//   const [books, setBooks] = useState([]);
//   const [isEditing, setIsEditing] = useState(false);
//   const [currentBook, setCurrentBook] = useState({
//     _id: '',
//     title: '',
//     author: '',
//     type: '',
//     genre: '',
//     publication: '',
//     pages: '',
//     price: '',
//     coverPhotoUrl: '',
//     active: true
//   });

//   useEffect(() => {
//     fetchBooks();
//   }, []);

//   const fetchBooks = async () => {
//     try {
//       const response = await fetch('http://localhost:5000/api/books');
//       const data = await response.json();
//       setBooks(data);
//     } catch (error) {
//       console.error('Error fetching books:', error);
//     }
//   };

//   const handleEdit = (book) => {
//     setIsEditing(true);
//     setCurrentBook(book);
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setCurrentBook({ ...currentBook, [name]: value });
//   };
  
//   // const handleChange = (e) => {
//   //   const { name, value } = e.target;
//   //   setCurrentBook({ ...currentBook, [name]: value });
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const config = {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify(currentBook)
//     };
  
//     try {
//       const response = await fetch(`http://localhost:5000/api/books/${currentBook._id}`, config);
//       if (!response.ok) {
//         throw new Error('Network response was not ok');
//       }
      
//       // Update the books state after successful edit
//       const updatedBooks = books.map(book => {
//         if (book._id === currentBook._id) {
//           return { ...book, ...currentBook };
//         }
//         return book;
//       });
  
//       setBooks(updatedBooks);
//       setIsEditing(false);
//       setCurrentBook({
//         _id: '',
//         title: '',
//         author: '',
//         type: '',
//         genre: '',
//         publication: '',
//         pages: '',
//         price: '',
//         coverPhotoUrl: '',
//         active: true // Reset to active for new book edits
//       });
//     } catch (error) {
//       console.error('Error:', error);
//     }
//   };
  

//   return (
//     <div className='admin'>
//       <h1>Admin Dashboard</h1>
//       <div style={{ textAlign: 'right', marginBottom: "20px", width: "80%" }}>
//         <Link to="/admin/add-book">
//           <button className='addbookBtn'>Add New Book</button>
//         </Link>
//       </div>

//       <table>
//         <thead>
//           <tr>
//             <th>Title</th>
//             <th>Author</th>
//             <th>Type of Book</th>
//             <th>Genre</th>
//             <th>Pages</th>
//             <th>Price</th>
//             <th>Publication</th>
//             <th>Active</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           {books.map(book => (
//             <tr key={book._id}>
//               <td>{book.title}</td>
//               <td>{book.author}</td>
//               <td>{book.type}</td>
//               <td>{book.genre}</td>
//               <td>{book.pages}</td>
//               <td>{book.price}</td>
//               <td>{book.publication}</td>
//               <td>{book.active ? 'Active' : 'Inactive'}</td>
//               <td style={{ textAlign: 'center' }}>
//                 <button style={{ padding: '3px 15px', backgroundColor: 'white', borderRadius: '3px' }} onClick={() => handleEdit(book)}>Edit</button>
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {isEditing && (
//         <div className="edit-book">
//           <form onSubmit={handleSubmit}>
//   <input
//     type="text"
//     name="title"
//     placeholder="Title"
//     value={currentBook.title}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="text"
//     name="author"
//     placeholder="Author"
//     value={currentBook.author}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="text"
//     name="type"
//     placeholder="Type of Book"
//     value={currentBook.type}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="text"
//     name="genre"
//     placeholder="Genre"
//     value={currentBook.genre}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="text"
//     name="publication"
//     placeholder="Publication"
//     value={currentBook.publication}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="number"
//     name="pages"
//     placeholder="Number of Pages"
//     value={currentBook.pages}
//     onChange={handleChange}
//     required
//   />
//   <input
//     type="number"
//     name="price"
//     placeholder="Price"
//     value={currentBook.price}
//     onChange={handleChange}
//     required
//   />
//   <select
//     name="active"
//     value={currentBook.active ? 'active' : 'inactive'}
//     onChange={handleChange}
//     required
//   >
//     <option value="active">Active</option>
//     <option value="inactive">Inactive</option>
//   </select>
//   <button type="submit">Save Changes</button>
//   <button onClick={() => setIsEditing(false)}>Cancel</button>
// </form>

//         </div>
//       )}
//     </div>
//   );
// };

// export default Admin;


import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Admin.css';

const Admin = () => {
  const [books, setBooks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentBook, setCurrentBook] = useState({
    _id: '',
    title: '',
    author: '',
    type: '',
    genre: '',
    publication: '',
    pages: '',
    price: '',
    coverPhotoUrl: '',
    active: true
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/books');
      const data = await response.json();
      setBooks(data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleEdit = (book) => {
    setIsEditing(true);
    setCurrentBook(book);
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    // / Ensure value is not negative before updating state
  if (name === 'pages' || name === 'price') {
    if (parseInt(value) < 0) {
      // alert("Number should be positive number") 
      // Optionally, you can alert the user or handle the validation error here
      return; // Prevent updating state with negative values
    }
  }

    if (type === 'checkbox') {
      setCurrentBook({ ...currentBook, [name]: checked });
    } else {
      setCurrentBook({ ...currentBook, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(currentBook)
    };

    try {
      const response = await fetch(`http://localhost:5000/api/books/${currentBook._id}`, config);
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      
      // Update the books state after successful edit
      const updatedBooks = books.map(book => {
        if (book._id === currentBook._id) {
          return { ...currentBook };
        }
        return book;
      });

      setBooks(updatedBooks);
      setIsEditing(false);
      setCurrentBook({
        _id: '',
        title: '',
        author: '',
        type: '',
        genre: '',
        publication: '',
        pages: '',
        price: '',
        coverPhotoUrl: '',
        active: true // Reset to active for new book edits
      });
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='admin'>
      <h1>Admin Dashboard</h1>
      <div style={{ textAlign: 'right', marginBottom: "20px", width: "80%" }}>
        <Link to="/admin/add-book">
          <button className='addbookBtn'>Add New Book</button>
        </Link>
      </div>

      <table>
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
          {books.map(book => (
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
                    
          <option value='Poems'>Poems</option>
          <option value="Novel">Novel</option>
          <option value="Stories">Stories</option>
          <option value="Auto-biography">  Auto-biography</option>
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
              <td>
                {isEditing && currentBook._id === book._id ? (
                  <input
                    type="checkbox"
                    name="active"
                    checked={currentBook.active}
                    onChange={handleChange}
                  />
                ) : (
                  book.active ? 'Active' : 'Inactive'
                )}
              </td>
              <td style={{ textAlign: 'center' }}>
                {isEditing && currentBook._id === book._id ? (
                  <>
                    <button onClick={handleSubmit}>Save</button>
                    <button onClick={() => setIsEditing(false)}>Cancel</button>
                  </>
                ) : (
                  <button onClick={() => handleEdit(book)}>Edit</button>
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








