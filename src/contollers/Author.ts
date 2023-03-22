// from express for ts func
import { Request, Response, NextFunction } from 'express';
// dependencies
import mongoose from 'mongoose';
//Author model
import Author from '../models/Author';

// create an author:
const createAuthor = (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;
    const author = new Author({
        _id: new mongoose.Types.ObjectId(),
        name
    });

    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json(error));
};

// get 1 author by id:
const readAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};

// get all authors:
const readAllAuthors = (req: Request, res: Response, next: NextFunction) => {
    return Author.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
};

// update one author
const updateAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findById(authorId)
        .then((author) => {
            if (author) {
                author.set(req.body);

                return author
                    .save()
                    .then((author) => res.status(201).json({ author }))
                    .catch((error) => res.status(500).json({ error }));
            } else {
                res.status(404).json({ message: 'not found' });
            }
        })
        .catch((error) => res.status(500).json({ error }));
};

// delete one author by ID
const deleteAuthor = (req: Request, res: Response, next: NextFunction) => {
    const authorId = req.params.authorId;

    return Author.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'nof found' })))
        .catch((error) => res.status(500).json({ error }));
};

export default {
    createAuthor,
    readAuthor,
    readAllAuthors,
    updateAuthor,
    deleteAuthor
};
