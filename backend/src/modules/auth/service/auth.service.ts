import { User } from '../../users/entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  private userRepository: Repository<User>;
  constructor(
    private jwtService: JwtService,
    private connection: Connection
  ) {
    this.userRepository = this.connection.getRepository(User);
  }
  // helpers start
  public generateHashPassword(pass: string) {
    const salt = Number(process.env.BCRYPT_SALT);
    const hashUserPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(salt))
    return hashUserPass;
  };

  public comparePassword(hashpass: string, passfromdb: string) {
    return bcrypt.compareSync(hashpass, passfromdb)
  };

  private generateAccessToken(userId: string, role:string) {
    const payload = {
      id: userId,
      role: role,
      type: process.env.JWT_TYPE_EC
    }
    return { accessToken: this.jwtService.sign(payload,) }
  }
  // helpers start end
  public async checkUser(name: string, password: string) {
    //admin lallaal2e
    return await this.userRepository.findOne({name})
      .then(user => {
        if(!user) return user  //incorrect data or not found customer in db
        const isValid = this.comparePassword(password, user.password)
        if(isValid) {
          return this.generateAccessToken(user.id, user.role);
        }  else {  
          throw new HttpException('Incorrect password', HttpStatus.UNAUTHORIZED);
        }
      })
  };


}
