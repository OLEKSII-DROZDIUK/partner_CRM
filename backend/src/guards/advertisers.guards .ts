import {
    ExecutionContext,
    HttpException,
    HttpStatus,
    Injectable,
  } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import { User } from '../modules/users/entities/users.entity';
  
  @Injectable()
  export class AdvertisersGuard {
    private usersRepository: Repository<User>;
    constructor(
      private jwtService: JwtService,
      private connection: Connection,
    ) {
      this.usersRepository = this.connection.getRepository(User)
    }
  
    public async canActivate(context: ExecutionContext) {
      try {
        const token  = context.switchToHttp().getRequest().headers.authorization.slice(6)
        const decodedjwt = this.jwtService.verify(token)

      return await this.usersRepository.findOne(decodedjwt.id)
        .then(user => {
          if(user.role === 'admin' || user.role === 'advertiserManager') return true
          throw new HttpException('Unauthorized access', HttpStatus.UNAUTHORIZED);
        })
      } catch(error) {
        throw new HttpException('Error when verify user', HttpStatus.BAD_REQUEST);
      }
    }

    public checkUserRole(){

    }
}