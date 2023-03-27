"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencies
const mongoose_1 = __importDefault(require("mongoose"));
//Book model
const Book_1 = __importDefault(require("../models/Book"));
// create a book:
const createBook = (req, res, next) => {
    const { title, author, genre, sample, awards } = req.body;
    const book = new Book_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        title,
        author,
        genre,
        sample,
        awards
    });
    return book
        .save()
        .then((book) => res.status(201).json({ book }))
        .catch((error) => res.status(500).json(error));
};
// get 1 book by id:
const readBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findById(bookId)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
// get all books:
const readAllBooks = (req, res, next) => {
    return Book_1.default.find()
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};
// update one book
const updateBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findById(bookId)
        .then((book) => {
        if (book) {
            book.set(req.body);
            return book
                .save()
                .then((book) => res.status(201).json({ book }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
// delete one book by ID
const deleteBook = (req, res, next) => {
    const bookId = req.params.bookId;
    return Book_1.default.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'nof found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createBook,
    readBook,
    readAllBooks,
    updateBook,
    deleteBook
};
