import {Router} from 'express';
import multer from 'multer';
import uploadConfig from '@config/upload';

import UserMap from '@mappear/userMap';
import createUserService from '@modules/users/services/CreateUserService';
import updateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

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

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'),async(request, response)=>{
    const updateUserAvatar = new updateUserAvatarService();

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
});

export default usersRouter;

