
import { Pool, ResultSetHeader } from 'mysql2/promise';
import Users from '../interfaces/user.interface'


export default class UserModel {

     public connection:Pool

    constructor(connection: Pool) {
        this.connection = connection;
    }


    public async getAll(): Promise<Users[]> {
        const getUser = await this.connection.execute(
            'SELECT * FROM TypeScriptExpress.Users'
        )
        const [rows] = getUser;
        return rows as Users[];
    }


    public async getById(id: number): Promise<Users> {
        const getId = await this.connection.execute(
            'SELECT * FROM TypeScriptExpress.Users where id = ?', [id]
        )
        const [rows] = getId;
        const [user] = rows as Users[];
        return user
    }

    public async create(user: Users): Promise<Users> {
        const result = await this.connection.execute<ResultSetHeader>(
          'INSERT INTO Users (name, email, password) VALUES (?, ?, ?)',
          [ user.name, user.email, user.password],
        );
        const [dataInserted] = result;
        const { insertId } = dataInserted;
        return { id: insertId, ...user };
      }

      public async update(id: number, user: Users){
          await this.connection.execute<ResultSetHeader>(
              'UPDATE Users SET name = ?, email = ?, password = ? WHERE id = ?',
              [user.name, user.email, user.password, id]
          )
      }

      public async delete(id: number){
          await this.connection.execute(
              'DELETE FROM Users WHERE id = ?',[id]
          )
      }
}