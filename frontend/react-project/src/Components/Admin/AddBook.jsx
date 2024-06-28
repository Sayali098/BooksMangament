// import React, { useState } from 'react';

// const AddBook = ({ addBook }) => {
//   const [form, setForm] = useState({
//     title: '',
//     author: '',
//     type: '',
//     genre: '',
//     publication: '',
//     pages: '',
//     price: '',
//     image: null
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm({ ...form, [name]: value });
//   };

//   const handleFileChange = (e) => {
//     setForm({ ...form, image: e.target.files[0] });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const formData = new FormData();
//     for (const key in form) {
//       formData.append(key, form[key]);
//     }
//     await addBook(formData);
//     setForm({
//       title: '',
//       author: '',
//       type: '',
//       genre: '',
//       publication: '',
//       pages: '',
//       price: '',
//       image: null
//     });
//   };

//   return (
//     <div className="add-book">
//       <h2>Add New Book</h2>
//       <form onSubmit={handleSubmit}>
//         <input
//           type="text"
//           name="title"
//           placeholder="Title"
//           value={form.title}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="author"
//           placeholder="Author"
//           value={form.author}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="type"
//           placeholder="Type of Book"
//           value={form.type}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="genre"
//           placeholder="Genre"
//           value={form.genre}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="text"
//           name="publication"
//           placeholder="Publication"
//           value={form.publication}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="pages"
//           placeholder="Number of Pages"
//           value={form.pages}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="number"
//           name="price"
//           placeholder="Price"
//           value={form.price}
//           onChange={handleChange}
//           required
//         />
//         <input
//           type="file"
//           name="image"
//           onChange={handleFileChange}
//         />
//         <button type="submit">Add Book</button>
//       </form>
//     </div>
//   );
// };

// export default AddBook;

import React, { useState } from "react";
import "./AddBook.css";

const AddBook = ({ addBook }) => {
  const [form, setForm] = useState({
    title: "",
    author: "",
    type: "",
    genre: "",
    publication: "",
    pages: "",
    price: "",

    image: null,
    active: "active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleFileChange = (e) => {
    setForm({ ...form, image: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    for (const key in form) {
      formData.append(key, form[key]);
    }
    await addBook(formData);
    setForm({
      title: "",
      author: "",
      type: "",
      genre: "",
      publication: "",
      pages: "",
      price: "",
      image: null,

      active: "active",
    });
  };

  return (
    <div className="add-book">
      <h2>Add New Book</h2>
      <form onSubmit={handleSubmit} className="addBookForm">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={form.title}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={form.author}
          onChange={handleChange}
          required
        />
   
        <select name="type" value={form.type} onChange={handleChange} required>
          <option value="">Select Type</option>
          <option value='Poems'>Poems</option>
          <option value="Novel">Novel</option>
          <option value="Stories">Stories</option>
          <option value="Auto-biography">  Auto-biography</option>
        </select>
        
        
        <select name="genre" value={form.genre} onChange={handleChange} required>
          <option value="">Select Genre</option>
          <option value='History'>History</option>
          <option value="Science">Science</option>
          <option value="Arts">Arts</option>
          <option value="Science Fiction">Science Fiction</option>
        </select>
        {/* <input
          type="text"
          name="genre"
          placeholder="Genre"
          value={form.genre}
          onChange={handleChange}
          required
        /> */}

        <input
          type="text"
          name="publication"
          placeholder="Publication"
          value={form.publication}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="pages"
          placeholder="Number of Pages"
          value={form.pages}
          onChange={handleChange}
            min="0"
          required
        />
        <input
          type="number"
          name="price"
          placeholder="Price"
          value={form.price}
          onChange={handleChange}
            min="0"
          required
        />
        <input type="file" name="image" onChange={handleFileChange} />

        <select
          name="active"
          value={form.active}
          onChange={handleChange}
          required
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
        <button type="submit">Add Book</button>
      </form>
    </div>
  );
};

export default AddBook;

{
  /* <td>
{isEditing && currentBook._id === book._id ? (
  <select
    name="type"
    value={currentBook.type}
    onChange={handleChange}
    required
  >
    <option value="">Select Type</option>
    <option value="Novel">Novel</option>
    <option value="Stories">Stories</option>
    <option value="Autobiography">Autobiography</option>
  </select>
) : (
  book.type
)}
</td> */
}
