const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
const Book = require("./models/Book");
const app = express();
const port = 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// MongoDB connection
mongoose
  .connect(
    "mongodb+srv://shelakesayali:sayalishelake@cluster0.j8h8r0a.mongodb.net/bookDB",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  )
  .then(() => console.log("Successfully connected to MongoDB"))
  .catch((err) => console.error("Error connecting to MongoDB", err));

// Multer configuration for file upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({ storage: storage });

// Get all books
app.get("/api/books", async (req, res) => {
  try {
    const books = await Book.find({ active: true }).select("-__v");

    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//Get both active and inactive data in admin table

app.get("/api/books/all", async (req, res) => {
  try {
    const books = await Book.find().select("-__v");
    res.json(books);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// GET single book by Id
app.get("/api/books/:id", async (req, res) => {
  try {
    const book = await Book.findById(req.params.id).select("-__v");
    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

// // POST new book
app.post("/api/books", upload.single("image"), async (req, res) => {
  const { title, author, type, genre, publication, pages, price, active } =
    req.body;
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
    active: active === "active",
  });

  try {
    const savedBook = await newBook.save();
    res.status(201).json(savedBook);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

//  put book by id

app.put("/api/books/:id", async (req, res) => {
  const { id } = req.params;
  const updatedData = req.body;

  try {
    const book = await Book.findByIdAndUpdate(id, updatedData, { new: true });
    if (!book) {
      return res.status(404).send("Book not found");
    }
    res.json(book);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

//
// DELETE book by Id
app.delete("/api/books/:id", async (req, res) => {
  try {
    let book = await Book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ msg: "Book not found" });
    }

    book = await Book.findByIdAndUpdate(
      req.params.id,
      { $set: { active: false } },
      { new: true }
    );

    res.json({ msg: "Book deactivated" });
  } catch (err) {
    console.error(err.message);
    res.status(500).send("Server Error");
  }
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
