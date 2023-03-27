"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// dependencies
const mongoose_1 = __importDefault(require("mongoose"));
//Author model
const Author_1 = __importDefault(require("../models/Author"));
// create an author:
const createAuthor = (req, res, next) => {
    const { name } = req.body;
    const author = new Author_1.default({
        _id: new mongoose_1.default.Types.ObjectId(),
        name
    });
    return author
        .save()
        .then((author) => res.status(201).json({ author }))
        .catch((error) => res.status(500).json(error));
};
// get 1 author by id:
const readAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => (author ? res.status(200).json({ author }) : res.status(404).json({ message: 'not found' })))
        .catch((error) => res.status(500).json({ error }));
};
// get all authors:
const readAllAuthors = (req, res, next) => {
    return Author_1.default.find()
        .then((authors) => res.status(200).json({ authors }))
        .catch((error) => res.status(500).json({ error }));
};
// update one author
const updateAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findById(authorId)
        .then((author) => {
        if (author) {
            author.set(req.body);
            return author
                .save()
                .then((author) => res.status(201).json({ author }))
                .catch((error) => res.status(500).json({ error }));
        }
        else {
            res.status(404).json({ message: 'not found' });
        }
    })
        .catch((error) => res.status(500).json({ error }));
};
// delete one author by ID
const deleteAuthor = (req, res, next) => {
    const authorId = req.params.authorId;
    return Author_1.default.findByIdAndDelete(authorId)
        .then((author) => (author ? res.status(201).json({ message: 'deleted' }) : res.status(404).json({ message: 'nof found' })))
        .catch((error) => res.status(500).json({ error }));
};
exports.default = {
    createAuthor,
    readAuthor,
    readAllAuthors,
    updateAuthor,
    deleteAuthor
};
