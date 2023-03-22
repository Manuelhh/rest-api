import express from 'express';
import authorController from '../contollers/Author';
import { Schemas, validateSchema } from '../middleware/validateSchema';

const router = express.Router();

router.post('/create', validateSchema(Schemas.author.create), authorController.createAuthor);
router.get('/get/:authorId', authorController.readAuthor);
router.get('/get', authorController.readAllAuthors);
router.patch('/update/:authorId', validateSchema(Schemas.author.update), authorController.updateAuthor);
router.delete('/delete/:authorId', authorController.deleteAuthor);

export = router;
