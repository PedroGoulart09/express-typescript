import UserService from "../services/user.service";
import {Request, Response} from "express"
import { StatusCodes } from 'http-status-codes';

export default class UserController {

    constructor(private userService = new UserService()) {}

    public getAll = async (req: Request, res: Response) => {
        const getUser = await this.userService.getUser();
        return res.status(StatusCodes.OK).json(getUser)
    }

    public getUserId = async (req: Request, res: Response) => {
        const {id} = req.params;
        const getId = await this.userService.getUserById(parseInt(id))
        if (!getId) {
            return res.status(StatusCodes.NOT_FOUND).json({message: 'User not found'})
        }
        return res.status(StatusCodes.OK).json(getId)
    }

    public create = async (req: Request, res: Response) => {
        const user = req.body;
        const userCreated = await this.userService.createUser(user);
        res.status(StatusCodes.CREATED).json(userCreated);
      };

      public update = async (req:Request, res: Response) => {
          const {id} = req.params;
           await this.userService.update(Number(id), req.body)
          return res.status(StatusCodes.NO_CONTENT).json(this.getAll);
      }


      public delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id);
        await this.userService.delete(id);
  
        res.status(StatusCodes.OK).json({ message: 'Book deleted successfully' });
      };
}