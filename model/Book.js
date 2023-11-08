const mongoose = require("mongoose");

const Schema = mongoose.Schema;

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
const bookSchema = new Schema({
  name: {
    type: String,
    required: true,
    validate: {
      validator: (value) => {
        console.log(value);
        return value.length <= 100;
      },
      message: "Books name too long",
    },
  },
  author: authorSchema,
  publishYear: {
    type: Number,
    min: 1000,
    max: new Date().getFullYear(),
  },
});

module.exports = mongoose.model("Book", bookSchema);
