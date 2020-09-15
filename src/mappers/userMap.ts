import User from '../models/Users';

export default class UserMap {
  //Altere de any para a sua model de User
  public static toDTO(user: User) {
    return {
      id: user.id,
      name: user.name,
      email: user.email,
    };
  }
}
