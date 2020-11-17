import { User } from '../../users/entities/users.entity';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Connection, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private userRepository: Repository<User>;
  constructor(
    private jwtService: JwtService,
    private connection: Connection,
    private configService: ConfigService,
  ) {
    this.userRepository = this.connection.getRepository(User);
  }

  public comparePassword(hashpass: string, passfromdb: string) {
    return bcrypt.compareSync(hashpass, passfromdb)
  };

  private generateAccessToken(userId: string, role:string) {
    const type = this.configService.get<string>('jwtTypeEC')
    const payload = {
      id: userId,
      role: role,
      type
    }
    return { accessToken: this.jwtService.sign(payload) }
  }

  // helpers start end
  public async checkUser(name: string, password: string) {
    const user: User = await this.userRepository.findOne({name});
    if (!user) {
      throw new HttpException('User not found', HttpStatus.NOT_FOUND)
    }

    const isValid = this.comparePassword(password, user.password);
    if (!isValid) {
      throw new HttpException('Incorrect password', HttpStatus.FORBIDDEN);
    }

    return this.generateAccessToken(user.id, user.role);
  };

  public findUser(token: string): Promise<User> {
    const decodedjwt = this.jwtService.verify(token)
    return this.userRepository.findOne(decodedjwt.id)
	}
}
