import { Body, Controller, UseGuards, Get, Post, Put, HttpCode, UsePipes } from '@nestjs/common';
import { User } from '../entities/users.entity';
import { UsersService } from '../services/users.service';
import { UserDto } from '../dto/user.dto';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { AdminGuard } from '../../auth/guards/admin.guards';

@Controller('users')
export class UsersController {
  constructor(
    private readonly userService: UsersService) {
    this.userService.createAdmin();
  }

  @Get()
  @UseGuards(AdminGuard)
    private async getAllUsers(): Promise<User[]> {
      return await this.userService.findAllUsers()
    }
  
  @HttpCode(201)
  @Post()
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe())
    private async create(@Body() body: UserDto): Promise<User> {
      return await this.userService.create(body)
    }
  
  @Put('/update')
  @UseGuards(AdminGuard)
  @UsePipes(new ValidationPipe())
    private async update(@Body() body: UserDto): Promise<User> {
      return await this.userService.update(body)
    }
}