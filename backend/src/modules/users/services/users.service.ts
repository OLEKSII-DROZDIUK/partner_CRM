import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';

enum UserRole {
  admin = 'admin',
}
enum UserStatus {
  active =  'active',
}


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  public generateHashPassword(pass: string) {
    const salt = Number(process.env.BCRYPT_SALT);
    const hashUserPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(salt))
    return hashUserPass;
  };

  public userHelperDataGenerator(newData: any ) {
    const { email , name, password, role, status } = newData;

    if(password.length>0) {
      return {
        email:email,
        name: name,
        password: this.generateHashPassword(password),
        role:role,
        status:status
      }
    } else {
      return {
        email:email,
        name: name,
        role:role,
        status:status
      }
    }
  };

  public async createAdmin() {
    const userAdmin  = new User()
    userAdmin.name = 'superadmin';
    userAdmin.password = this.generateHashPassword('superadmin');
    userAdmin.role = UserRole.admin;
    userAdmin.status = UserStatus.active;
    userAdmin.email = 'superadmin@email.su';

   await this.usersRepository.find()
      .then(users => {
        if(users.length === 0){
          this.usersRepository.save(userAdmin)
          .then(admin => {
            console.log("SUPER ADMIN DATA", admin, 
            'password: superadmin')
          })
        }
      })
      // this.usersRepository.save({

      // })
  }

}