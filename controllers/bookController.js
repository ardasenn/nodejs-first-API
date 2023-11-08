const Book = require("../model/Book");

const createBook = async (req, res) => {
  const data = req.body;
  try {
    const book = await Book.create({
      name: data.name,
      author: { name: data.author.name, age: data.author.age },
      publishYear: data.publishYear,
    });

    return res.status(201).json(book);
  } catch (error) {
    console.log(error);
  }
  res.status(400).json({ error });
};

const getById = async (req, res) => {
  if (!req?.params?.id) {
    return res.status(400).json({ message: "id paramerter is required" });
  }
  try {
    const book = await Book.findOne({ _id: req.params.id }).exec();
    if (!book) {
      return res.status(204).json({ message: "Book was not found" });
    }
    res.json(book);
  } catch (error) {
    console.log(error);
  }
};

const getAll = async (req, res) => {
  const bookList = await Book.find();
  if (!bookList) return res.status(204).json("No books found");

  res.json(bookList);
};

const updateBook = async (req, res) => {
  const data = req.body;
  try {
    const book = await Book.findOne({ _id: data._id }).exec();
    if (!book)
      return res.status(404).json(`Book not found with id:${data._id}`);
    book.name = data.name;
    book.publishYear = data.publishYear;
    const result = await book.save();
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
  }
  res.status(400).json({ error });
};

const deleteBook = async (req, res) => {
  const bookId = req.body?._id; // req.body'den _id'yi al
  if (!bookId) {
    return res.status(400).json({ message: "id parameter is required" });
  }
  try {
    const book = await Book.findOne({ _id: bookId }).exec();
    if (!book) {
      return res.status(204).json({ message: "Book was not found" });
    }
    const result = await book.deleteOne(); // deleteOne metodunu await ile çağır
    res.json(result);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "An error occurred" });
  }
};
module.exports = { createBook, getById, getAll, updateBook, deleteBook };
