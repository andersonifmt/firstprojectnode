import { getRepository } from 'typeorm';
import {compare} from 'bcryptjs';

import User from "../models/Users";
import { response } from 'express';
import usersRouter from '../routes/users.routes';

interface Request{
  email: string;
  password: string;
}

interface Response{
  user: User;
}

class AuthenticateUserService{
  public async execute({email, password}: Request): Promise<Response>{
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({where: {email}});

    if(!user){
      throw new Error('Incorrect email/password combination.');
    }

    const passwordMathched = await compare(password, user.password);

    if(!passwordMathched){
      throw new Error('Incorrect email/password combination.');
    }

    return {
      user,
    };

  }
}

export default AuthenticateUserService;