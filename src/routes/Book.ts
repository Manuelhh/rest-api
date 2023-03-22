import express from 'express';
import bookController from '../contollers/Book';

const router = express.Router();

router.post('/create', bookController.createBook);
router.get('/get/:bookId', bookController.readBook);
router.get('/get', bookController.readAllBooks);
router.patch('/update/:bookId', bookController.updateBook);
router.delete('/delete/:bookId', bookController.deleteBook);

export = router;
