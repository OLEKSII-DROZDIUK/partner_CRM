import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

  @Injectable()
  export class AdvertisersGuard {
    constructor(private readonly authService: AuthService) 
    { }
  
    public async canActivate(context: ExecutionContext) {
      try {
        const user = await this.authService.findUser(context)
        return (user.role === 'admin' || user.role === 'advertiserManager')
      } catch(error) {
        throw new HttpException('Error when verify user', HttpStatus.BAD_REQUEST);
      }
    }
}