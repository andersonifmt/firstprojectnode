import { injectable, inject } from 'tsyringe';

//import AppError from '@shared/erros/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvider';

//import User from "../infra/typeorm/entities/User";

interface IRequest{
  email: string;
}

@injectable()
class SendForgotPasswordEmailService{
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('MailProvider')
    private mailProvider: IMailProvider,
  ){}

  public async execute({ email }: IRequest): Promise<void>{
    this.mailProvider.sendEmail(
      email,
      'Pedido de recuperação de senha recebido'
    );
  }
   

}

export default SendForgotPasswordEmailService;