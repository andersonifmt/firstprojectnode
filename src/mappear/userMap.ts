import User from '@modules/users/infra/typeorm/entities/User';

export default class UserMap {
  public static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
