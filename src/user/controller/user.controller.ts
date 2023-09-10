import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  HttpException,
  HttpStatus,
  Param,
  Post,
} from '@nestjs/common';
import { UserService } from '../service/user.service';
import { User } from '../interface/user.interface';
import { CreateUserDto } from '../dto/createUser.dto';

@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/')
  @HttpCode(201)
  async createUser(@Body() user: CreateUserDto): Promise<User> {
    try {
      const newUser: User = await this.userService.createUser(user);
      // res.status(201).send(newUser);
      return newUser;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/')
  @HttpCode(200)
  async findAll(): Promise<User[]> {
    try {
      const users = await this.userService.findAll();
      return users;
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/id/:id')
  @HttpCode(200)
  async findById(@Param('id') id: number): Promise<User> {
    try {
      // res.status(201).send(newUser);
      return this.userService.findById(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/login/:username/:password')
  @HttpCode(200)
  async login(
    @Param('username') username: string,
    @Param('password') password: string,
  ): Promise<any> {
    try {
      // res.status(201).send(newUser);
      return this.userService.login(username, password);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Get('/token')
  @HttpCode(200)
  async verifyToken(@Headers('Authorization') token: string): Promise<any> {
    try {
      // res.status(201).send(newUser);
      return this.userService.verifyToken(token);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: 'Error in the request',
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
