import connection from '../models/connection'
import UserModel from '../models/user.model'
import Users from '../interfaces/user.interface'
import { NotFoundError } from 'restify-errors';


export default class UserService {
    
    public model: UserModel;

    constructor() {
        this.model = new UserModel(connection)
    }

    public async getUser(): Promise<Users[]> {
        const getAll = await this.model.getAll()
        return getAll
    }

    public async getUserById(id: number): Promise<Users> {
        const getId = await this.model.getById(id)
        return getId
    }

    public async createUser(user: Users): Promise<Users> {
        return await this.model.create(user)
    }

    public async update(id: number, user: Users): Promise<void> {
        const users = await this.model.getById(id);
        if (!users) {
          throw new NotFoundError('NotFoundError');
        }
    
        return this.model.update(id, user);
      }

      public async delete(id: number): Promise<void> {
         return await this.model.delete(id) 
      }
}

