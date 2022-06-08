import connection from '../models/connection'
import BookModel from '../models/book.model'
import BookInterface from '../interfaces/book.interface'
import { NotFoundError } from 'restify-errors';

class BookService {
    public model: BookModel;

    constructor() {
        this.model = new BookModel(connection);
    }

    public async getAll(): Promise<BookInterface[]> {
        const books = await this.model.getAll();
        return books
    }


    public async getById(id: number): Promise<BookInterface> {
        const getId = await this.model.getById(id);

        return getId;
    }

    public async update(id: number, book: BookInterface): Promise<void> {
        const bookFound = await this.model.getById(id);
        if (!bookFound) {
          throw new NotFoundError('NotFoundError');
        }
    
        return this.model.editBook(id, book);
      }

    public create(book: BookInterface): Promise<BookInterface> {
        return this.model.create(book);
      }

}

export default BookService;