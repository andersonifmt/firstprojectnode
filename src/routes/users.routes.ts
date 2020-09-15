import {Router} from 'express';
import UserMap from '../mappers/userMap';
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

    const mappedUser = UserMap.toDTO(user);
    
    return response.json(mappedUser);
  } catch(err){
    return response.status(400).json({ error: err.message});
  }
});

export default usersRouter;

