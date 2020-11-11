import { Body, Controller, UseGuards, Get, Post, Put, HttpCode } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { AdminGuard } from '../../../guards/admin.guards';

@Controller('users')
export class UsersController {
  constructor(
    private userService: UsersService,
  ) {
    this.userService.createAdmin();
  }

  @Get('/all')
  @UseGuards(AdminGuard)
    async getAllUsers(): Promise<User[]> {
      return await this.userService.findAllUsers()
    }
  
  @HttpCode(201)
  @Post('/create')
  @UseGuards(AdminGuard)
    async createUser(@Body() body: any): Promise<User> {
      return await this.userService.createUser(body.user)
    }
  
  @Put('/edit')
  @UseGuards(AdminGuard)
  async editUser(@Body() body: any): Promise<User> {
    return await this.userService.editUser(body.user)
  }
}