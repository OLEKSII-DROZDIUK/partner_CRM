import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from '../service/auth.service';
import { User } from '../../users/entities/users.entity';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {
  }

  @Post('/login')
    async findUser(@Body() body: any): Promise<User | HttpException> {
      return await this.authService.checkUser(body.name, body.password)
        .then(data => {
          if(!data)  {
            throw new HttpException('User not found', HttpStatus.NOT_FOUND);
          } else {
            throw new HttpException(data, HttpStatus.OK)
          };
        })
    }

  // @UseGuards(AuthGuard('jwt'))
  // @Get('profile')
  // getProfile(@Request() req) {
  //   return req.user;
  // }

  // @UseGuards(AuthGuard('jwt'))
  // @Post('refresh')
  // async refresh(@Request() req) {
  //   const admin =  await this.usersRepository.findOne(req.user.id);
  //   return this.authService.login(admin);
  // }
}
