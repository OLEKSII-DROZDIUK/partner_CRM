import {
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../modules/users/services/users.service';
  
  @Injectable()
  export class AdminGuard {
    constructor(
      private jwtService: JwtService,
      private userService: UsersService,
    ) {}
  
    public async canActivate(context: ExecutionContext):Promise<boolean> {
      try {
        const token  = context.switchToHttp().getRequest().headers.authorization.slice(6)
        const decodedjwt = this.jwtService.verify(token)
        const userAdmin = await this.userService.findUserById(decodedjwt.id)
        if(userAdmin.role === 'admin') return true
      } catch(error) {
        throw new HttpException('Error when verify user', HttpStatus.BAD_REQUEST);
      }
    }
}