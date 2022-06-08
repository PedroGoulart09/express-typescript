import { Router } from 'express';
import userController from '../controllers/user.controller';

const routerUser = Router();

const user = new userController()

routerUser.get('/user', user.getAll)
routerUser.get('/user/:id', user.getUserId)
routerUser.post('/user', user.create)
routerUser.put('/user/:id', user.update)
routerUser.delete('/user/:id', user.delete)




export default routerUser