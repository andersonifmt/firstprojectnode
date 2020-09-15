import {Router} from 'express';
import User from '../models/Users';
import createUserService from '../services/CreateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response)=>{
  try{
    const {name, email, password} = request.body;

    const createUser = new createUserService();

    const user = await createUser.execute({ 
      name,
      email,
      password,
    });

    user.password = "";
    
    return response.json(user);
  } catch(err){
    return response.status(400).json({ error: err.message});
  }
});

export default usersRouter;