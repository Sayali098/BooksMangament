
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { check, validationResult } = require('express-validator');
const multer = require('multer');
const path = require('path');
const Book = require('./models/Book');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/uploads', express.static('uploads'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// MongoDB connection
mongoose.connect('mongodb+srv://shelakesayali:sayalishelake@cluster0.j8h8r0a.mongodb.net/bookDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,

});
const db = mongoose.connection;
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Multer configuration for file upload (cover photos)
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './uploads');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

  
const upload = multer({ storage: storage });

// app.post("/upload", upload.single("books"), (req, res) => {
//     res.json({
//       success: 1,
//       image_url: `http://localhost:${port}/images/${req.file.filename}`,
//     });
//   });

// Routes

// GET all books
app.get('/api/books', async (req, res) => {
    try {
        const books = await Book.find().select('-__v');
        // const books = await Book.find({active:true}).select('-__v');
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

//get all inactive to admin
app.get('/api/books/inactive', async (req, res) => {
    try {
        const books = await Book.find({ active: false }).select('-__v');
        res.json(books);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// GET single book by ID
app.get('/api/books/:id', async (req, res) => {
    try {
        const book = await Book.findById(req.params.id).select('-__v');
        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }
        res.json(book);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// // POST new book
app.post('/api/books', upload.single('image'), async (req, res) => {
    const { title, author, type, genre, publication, pages, price ,active} = req.body;
    const coverPhotoUrl = req.file ? req.file.path : null;
  
    const newBook = new Book({
      title,
      author,
      type,
      genre,
      publication,
      pages,
      price,
      coverPhotoUrl,
      active: active === 'active' 
    });
  
    try {
      const savedBook = await newBook.save();
      res.status(201).json(savedBook);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });

//   //put book by id
app.put('/api/books/:id', async (req, res) => {
    const { active } = req.body;
  
    try {
      const updatedBook = await Book.findByIdAndUpdate(
        req.params.id,
        { active },
        { new: true }
      );
  
      if (!updatedBook) {
        return res.status(404).json({ msg: 'Book not found' });
      }
  
      res.json(updatedBook);
    } catch (error) {
      console.error(error.message);
      res.status(400).json({ message: error.message });
    }
  });
//   app.put('/api/books/:id', upload.single('image'), async (req, res) => {
//     const { title, author, type, genre, publication, pages, price ,active} = req.body;
//     const coverPhotoUrl = req.file ? req.file.path : null;
  
//     try {
//       const updatedBook = await Book.findByIdAndUpdate(req.params.id, {
//         title,
//         author,
//         type,
//         genre,
//         publication,
//         pages,
//         price,
//         coverPhotoUrl,
//             active: active === 'active'
//       }, { new: true });
  
//       res.json(updatedBook);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });

// DELETE book by ID
app.delete('/api/books/:id', async (req, res) => {
    try {
        let book = await Book.findById(req.params.id);

        if (!book) {
            return res.status(404).json({ msg: 'Book not found' });
        }

        book = await Book.findByIdAndUpdate(req.params.id,
            { $set: { active:false} },
            { new: true }
        );

        res.json({ msg: 'Book deactivated' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
