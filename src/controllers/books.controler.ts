import BookService from "../services/books.service";
import {Request, Response} from "express"
import { StatusCodes } from 'http-status-codes';

class BookController {

    constructor(private bookService = new BookService()) {};

     public getAll = async (req: Request, res: Response) => {
        const books = await this.bookService.getAll();
        return res.status(StatusCodes.OK).json(books);
     }

     public getById = async (req: Request, res: Response) => {
         const {id} = req.params;
         const getID = await this.bookService.getById(parseInt(id))
         if (!getID) {
             return res.status(StatusCodes.NOT_FOUND)
             .json({message: 'Book not found'})
         }
         return res.status(StatusCodes.OK).json(getID);
     }

     public create = async (req: Request, res: Response) => {
        const book = req.body;
    
        const bookCreated = await this.bookService.create(book);
        res.status(StatusCodes.CREATED).json(bookCreated);
      };

      public editBook = async (req: Request, res: Response) => {
          const {id} = req.params
          const book = req.body;
          await this.bookService.update(parseInt(id), book);
          res.status(StatusCodes.NO_CONTENT).end();
      }

}

export default BookController;