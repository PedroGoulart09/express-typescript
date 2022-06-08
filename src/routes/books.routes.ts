import { Router } from 'express';
import BookController from '../controllers/books.controler';

const router = Router();
const booksController = new BookController();

router.get('/books', booksController.getAll)
router.get('/books/:id', booksController.getById)
router.put('/books/:id', booksController.editBook)
router.post('/books', booksController.create)

export default router;