import express from 'express';
import authorController from '../contollers/Author';

const router = express.Router();

router.post('/create', authorController.createAuthor);
router.get('/get/:authorId', authorController.readAuthor);
router.get('/get', authorController.readAllAuthors);
router.patch('/update/:authorId', authorController.updateAuthor);
router.delete('/delete/:authorId', authorController.deleteAuthor);

export = router;
