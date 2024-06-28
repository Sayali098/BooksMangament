import React from 'react'

const EditBook = () => {
  return (
    
       <div className="mt-4">
            <h2> 'Edit Book'</h2>
            <form>
                <div className="form-group">
                    <label>Title</label>
                    <input type="text" name="title" className="form-control"  />
                </div>
                <div className="form-group">
                    <label>Author</label>
                    <input type="text" name="author" className="form-control"  />
                </div>
                <div className="form-group">
                    <label>Type</label>
                    <select name="type" className="form-control" >
                        <option value="Auto-biography">Auto-biography</option>
                        <option value="Novel">Novel</option>
                        <option value="Stories">Stories</option>
                        <option value="Poems">Poems</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Genre</label>
                    <select name="genre" className="form-control" >
                        <option value="History">History</option>
                        <option value="Science">Science</option>
                        <option value="Arts">Arts</option>
                        <option value="Science Fiction">Science Fiction</option>
                    </select>
                </div>
                <div className="form-group">
                    <label>Publication</label>
                    <input type="text" name="publication" className="form-control"  />
                </div>
                <div className="form-group">
                    <label>Pages</label>
                    <input type="number" name="pages" className="form-control"  />
                </div>
                <div className="form-group">
                    <label>Price</label>
                    <input type="number" name="price" className="form-control"  />
                </div>
                <div className="form-group">
                    <label>Cover Photo</label>
                    <input type="file" name="coverPhoto" className="form-control-file" />
                </div>
                <button type="submit" className="btn btn-primary mr-2">'Update'</button>
            </form>
        </div>
    );
    
  
}

export default EditBook




// // src/components/AddEditBook.js

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useHistory, useParams } from 'react-router-dom';
// import { useForm } from 'react-hook-form';

// const AddEditBook = () => {
//     const { id } = useParams();
//     const { register, handleSubmit, setValue } = useForm();
//     const history = useHistory();
//     const [book, setBook] = useState({});
//     const [coverPhoto, setCoverPhoto] = useState(null);

//     useEffect(() => {
//         if (id) {
//             axios.get(`/api/books/${id}`)
//                 .then(res => {
//                     setBook(res.data);
//                     Object.keys(res.data).forEach(key => {
//                         setValue(key, res.data[key]);
//                     });
//                 })
//                 .catch(err => console.log(err));
//         }
//     }, [id, setValue]);

//     const onSubmit = data => {
//         const formData = new FormData();
//         formData.append('title', data.title);
//         formData.append('author', data.author);
//         formData.append('type', data.type);
//         formData.append('genre', data.genre);
//         formData.append('publication', data.publication);
//         formData.append('pages', data.pages);
//         formData.append('price', data.price);
//         if (coverPhoto) {
//             formData.append('coverPhoto', coverPhoto);
//         }

//         if (id) {
//             axios.put(`/api/books/${id}`, formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })
//             .then(res => {
//                 history.push('/');
//             })
//             .catch(err => console.log(err));
//         } else {
//             axios.post('/api/books', formData, {
//                 headers: {
//                     'Content-Type': 'multipart/form-data'
//                 }
//             })
//             .then(res => {
//                 history.push('/');
//             })
//             .catch(err => console.log(err));
//         }
//     };

//     const handleCoverPhotoChange = (files) => {
//         setCoverPhoto(files[0]);
//     };

//     return (
//         <div className="mt-4">
//             <h2>{id ? 'Edit Book' : 'Add New Book'}</h2>
//             <form onSubmit={handleSubmit(onSubmit)}>
//                 <div className="form-group">
//                     <label>Title</label>
//                     <input type="text" name="title" className="form-control" ref={register} />
//                 </div>
//                 <div className="form-group">
//                     <label>Author</label>
//                     <input type="text" name="author" className="form-control" ref={register} />
//                 </div>
//                 <div className="form-group">
//                     <label>Type</label>
//                     <select name="type" className="form-control" ref={register}>
//                         <option value="Auto-biography">Auto-biography</option>
//                         <option value="Novel">Novel</option>
//                         <option value="Stories">Stories</option>
//                         <option value="Poems">Poems</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>Genre</label>
//                     <select name="genre" className="form-control" ref={register}>
//                         <option value="History">History</option>
//                         <option value="Science">Science</option>
//                         <option value="Arts">Arts</option>
//                         <option value="Science Fiction">Science Fiction</option>
//                     </select>
//                 </div>
//                 <div className="form-group">
//                     <label>Publication</label>
//                     <input type="text" name="publication" className="form-control" ref={register} />
//                 </div>
//                 <div className="form-group">
//                     <label>Pages</label>
//                     <input type="number" name="pages" className="form-control" ref={register} />
//                 </div>
//                 <div className="form-group">
//                     <label>Price</label>
//                     <input type="number" name="price" className="form-control" ref={register} />
//                 </div>
//                 <div className="form-group">
//                     <label>Cover Photo</label>
//                     <input type="file" name="coverPhoto" className="form-control-file" onChange={(e) => handleCoverPhotoChange(e.target.files)} />
//                 </div>
//                 <button type="submit" className="btn btn-primary mr-2">{id ? 'Update' : 'Add'}</button>
//             </form>
//         </div>
//     );
// };

// export default AddEditBook;
