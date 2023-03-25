// from express for ts func
import { Request, Response, NextFunction } from 'express';
// dependencies
import mongoose from 'mongoose';
//Book model
import Book from '../models/Book';

// create a book:
const createBook = (req: Request, res: Response, next: NextFunction) => {
    const { title, author, genre, sample, awards } = req.body;

    const book = new Book({
        _id: new mongoose.Types.ObjectId(),
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
const readBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => (book ? res.status(200).json({ book }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// get all books:
const readAllBooks = (req: Request, res: Response, next: NextFunction) => {
    return Book.find()
        .then((books) => res.status(200).json({ books }))
        .catch((error) => res.status(500).json({ error }));
};

// update one book
const updateBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findById(bookId)
        .then((book) => {
            if (book) {
                book.set(req.body);

                return book
                    .save()
                    .then((book) => res.status(201).json({ book }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

// delete one book by ID
const deleteBook = (req: Request, res: Response, next: NextFunction) => {
    const bookId = req.params.bookId;

    return Book.findByIdAndDelete(bookId)
        .then((book) => (book ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'nof found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createBook,
    readBook,
    readAllBooks,
    updateBook,
    deleteBook
};
