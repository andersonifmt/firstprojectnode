import { Request, Response } from 'express';

import { container } from 'tsyringe';

import createUserService from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import UserMap from '@mappear/userMap';

export default class UserAvatarController{
  public async update(request: Request, response: Response): Promise<Response>{
    const updateUserAvatar = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatar.execute({
      user_id: request.user.id,
      avatarFilename: request.file.filename
    })

    const mappedUser = UserMap.toDTO(user);

    return response.json(mappedUser);
  }
}