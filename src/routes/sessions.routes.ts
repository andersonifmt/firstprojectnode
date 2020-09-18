import {Router} from 'express';
import User from '../models/Users';
import UserMap from '../mappers/userMap';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response)=>{
    const {email, password} = request.body;

    const authenticateUser = new AuthenticateUserService();

    const { user, token }  = await authenticateUser.execute({
      email,
      password,
    });

    const mappedUser = UserMap.toDTO(user);
    
    return response.json({ mappedUser, token } );
});

export default sessionsRouter;
