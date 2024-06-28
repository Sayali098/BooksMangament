// models/Book.js

const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
     title: {
           type: String,
           required: true,
           },
  author: { 
           type: String, 
           required: true  
        },
    type: {
         type: String,
        enum: ["Auto-biography", "Novel", "Stories", "Poems"],
        required: true,
         },
  genre: {
        type: String,
       enum: ["History", "Science", "Arts", "Science Fiction"],
      required: true,
  },
  publication:
       { 
        type: String, 
        required: true 
     },
  pages:
   { 
    type: Number 
   },
  price: 
  { 
    type: Number 
   },
  coverPhotoUrl: 
            { 
                type: String
             },
  active:
     { 
         type: Boolean,
          default: true 
        },
});

module.exports = mongoose.model("Book", bookSchema);
