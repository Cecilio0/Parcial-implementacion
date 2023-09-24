import {Injectable} from '@nestjs/common';
import {User} from '../interface/user.interface';
import {InjectRepository} from '@nestjs/typeorm';
import {UserEntity} from '../entity/user.entity';
import {Repository} from 'typeorm';
import {signJWT, verifyJWT} from 'src/utils/jwt.handler';
import {encrypt, verify} from 'src/utils/bcrypt.handler';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepository: Repository<UserEntity>,
  ) {}

  async createUser(user: User): Promise<User> {
    user.password = await encrypt(user.password);
    await this.userRepository.save(user);
    delete user.password;
    return user;
  }

  async findAll(): Promise<User[]> {
    const users: User[] = await this.userRepository.find();
    return users;
  }

  async findById(id: number): Promise<User> {
    const user: User = await this.userRepository.findOneBy({
      id: id,
    });
    return user;
  }

  async login(username: string, password: string): Promise<any> {
    const user: User = await this.userRepository.findOneBy({
      username,
    });
    if (user) {
      if (await verify(password, user.password)) {
        const jwt = signJWT(user);
        return {
          message: {
            token: jwt,
            user: {
              id: user.id,
              username: user.username,
              gender: user.gender,
            },
          },
        };
      }
    }
    return { message: 'Incorrect login data' };
  }

  async verifyToken(token: string): Promise<any> {
    try {
      const decodedJwt = verifyJWT(token);
      return decodedJwt;
    } catch (e) {
      return {
        type: 'Invalid Token',
        token,
      };
    }
  }
}
