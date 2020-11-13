import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { AuthService } from '../service/auth.service';

  @Injectable()
  export class AdminGuard {
    constructor(private readonly authService: AuthService)
    { }
  
    public async canActivate(context: ExecutionContext):Promise<boolean> {
      try {
        const userAdmin = await this.authService.findUser(context)
        return userAdmin.role === 'admin'
      } catch(error) {
        throw new HttpException('Error when verify user', HttpStatus.BAD_REQUEST)
      }
    }
}