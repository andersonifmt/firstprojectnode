import AppError from '@shared/erros/AppError';

import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import FakeUsersRepository from '../repositories/fakes/FakeUsersRepository';
import UpdateUserAvatar from './UpdateUserAvatarService';

import FakeHashProvider from '../providers/HashProvider/fakes/FakeHashProvider';

describe('UpdateUserAvatar', () => {
  it('Should be able to create a new user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    
    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('Should not be able to update avatar non existing user.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    
    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    expect(updateUserAvatar.execute({
      user_id: 'non-existing-user',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('Should be able to delete old avatar when updating new one.', async () => {
    const fakeUsersRepository = new FakeUsersRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');
    
    const updateUserAvatar = new UpdateUserAvatar(fakeUsersRepository, fakeStorageProvider);

    const user = await fakeUsersRepository.create({
      name: 'Jhon Doe',
      email: 'jhondoe@example.com',
      password: '123456',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });    

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');

    expect(user.avatar).toBe('avatar2.jpg');
  });
});