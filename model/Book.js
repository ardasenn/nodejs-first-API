const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => value.length >= 100,
      message: "Books name too long",
    },
  },
  author: {
    type: authorSchema,
    required: true,
  },
  publishYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear(),
  },
});

const authorSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
    min: 0,
  },
});
