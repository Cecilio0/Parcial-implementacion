import { Injectable } from '@nestjs/common';
import { User } from '../interface/user.interface';

@Injectable()
export class UserService {
  private readonly users: User[] = [];

  async createUser(user: User): Promise<User> {
    this.users.push(user);
    return user;
  }

  async findAll(): Promise<User[]> {
    return this.users;
  }

  async findById(id: number): Promise<User> {
    const user: User = this.users.find((obj: User) => {
      return obj.id == id;
    });
    return user;
  }
}
