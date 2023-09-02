import express from "express";
import { Book } from "../models/bookModel.js";

const router = express.Router();

// create a book
router.post("/", async (req, res) => {
  let { title, author, publishYear } = req.body;
  try {
    if (!title || !author || !publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const newBook = Book({
      title: title,
      author: author,
      publishYear: publishYear,
    });
    const book = await Book.create(newBook);
    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get all books
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Get one book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

//  Update a book
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      return res.status(400).send({
        message: "Send all required fields",
      });
    }
    const result = await Book.findByIdAndUpdate(id, req.body);

    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    return res
      .status(200)
      .send({ message: "Book details updated successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// Delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Book.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).send({ message: "Book not found!" });
    }
    res.status(200).send({ message: "Book deleted successfully!" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router;
