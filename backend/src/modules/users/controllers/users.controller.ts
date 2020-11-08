import { Body, Controller, UseGuards, Get, Param, Post, Request, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';

import { AdminGuard } from '../../../guards/admin.guards';


@Controller('users')
export class UsersController {
  private usersRepository: Repository<User>;
  constructor(
    private connection: Connection,
    private userService: UsersService,
  ) {
    this.usersRepository = this.connection.getRepository(User)
    this.userService.createAdmin();
  }

  @Get('/all')
  @UseGuards(AdminGuard)
    async getAllUsers(@Request() req): Promise<User[] | null> {
      return await this.usersRepository.find()
    }

  @Get(':id')
    async getOne(@Param('id') login: string): Promise<User> {
      return await this.usersRepository.findOne(login);
    }
  
  @Post('/create')
  @UseGuards(AdminGuard)
    async createUser(@Body() body: any): Promise<User> {
      const {email ,id, name, password, role, status } = body.user;

      const newUser = new User();
        newUser.email = email
        newUser.id = id
        newUser.name = name
        newUser.password = this.userService.generateHashPassword(password)
        newUser.role = role
        newUser.status = status
      
      return await this.usersRepository.save(newUser)
    }
  
    @Put('/edit')
    @UseGuards(AdminGuard)
    async editUser(@Body() body: any): Promise<User> {
     const newUserData = await this.userService.userHelperDataGenerator(body.user)
     return await this.usersRepository
        .createQueryBuilder()
        .update(User)
        .set(newUserData)
        .where({id: body.user.id})
        .execute()
        .then(result => {
          throw new HttpException('User edit', HttpStatus.OK);
        })
    }
}