import express from 'express';
import bookController from '../contollers/Book';
import { Schemas, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', validateSchema(Schemas.book.create), bookController.createBook);
router.get('/get/:bookId', bookController.readBook);
router.get('/get', bookController.readAllBooks);
router.patch('/update/:bookId', validateSchema(Schemas.book.update), bookController.updateBook);
router.delete('/delete/:bookId', bookController.deleteBook);

export = router;
