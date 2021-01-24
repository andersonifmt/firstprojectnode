import AppError from '@shared/erros/AppError';

import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import CreateUserService from './CreateUserService';

describe('CreateUser', () => {
  it('Should be able to create a new user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const CreateUser = new CreateUserService(fakeUsersRepository);

    const user = await CreateUser.execute({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('Should not be able to create a new user with same email from another.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();

    const CreateUser = new CreateUserService(fakeUsersRepository);

    const user = await CreateUser.execute({
      name: 'Jhon doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    expect(
      CreateUser.execute({
        name: 'Jhon doe',
        email: 'jhondoe@example.com',
        password: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});