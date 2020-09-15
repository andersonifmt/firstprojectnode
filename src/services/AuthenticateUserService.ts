import { getRepository } from 'typeorm';
import {compare} from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import User from "../models/Users";
import { response } from 'express';
import usersRouter from '../routes/users.routes';

interface Request{
  email: string;
  password: string;
}

interface Response{
  user: User;
  token: string;
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

    const token = sign({},'0c84028f177413ae53405de25f41eb63',{
      subject: user.id,
      expiresIn: '1d',
    });

    return {
      user,
      token,
    };

  }
}

export default AuthenticateUserService;