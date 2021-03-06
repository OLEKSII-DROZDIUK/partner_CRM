import { HttpException, HttpStatus, Injectable, ExecutionContext } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/users.entity';
import * as bcrypt from 'bcrypt';
import { UserRole } from '../entities/userRole.enum';
import { UserStatus } from '../entities/userStatus.enum';
import { UserDto } from '../dto/user.dto';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  public generateHashPassword(pass: string) {
    const salt = Number(this.configService.get<string>('bcryptSalt'))
    const hashUserPass = bcrypt.hashSync(pass, bcrypt.genSaltSync(salt))
    return hashUserPass;
  };

  public userHelperDataGenerator(newData: UserDto) {
    const { email, name, role, status } = newData;

    if(newData.password.length != 0) {
      return {
        email: email,
        name: name,
        password: this.generateHashPassword(newData.password),
        role: role,
        status: status
      }
    } else {
      return {
        email: email,
        name: name,
        role: role,
        status: status
      }
    }
	}
	
	public async create(user: UserDto) {
		const {  email, id, name, password, role, status } = user;

		const newUser = new User();
			newUser.email = email
			newUser.id = id
			newUser.name = name
			newUser.password = this.generateHashPassword(password)
			newUser.role = role
			newUser.status = status
			
		try {
			return await this.usersRepository.save(newUser)
		} catch(e) {
			throw new HttpException('Server error, can create user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

  public createAdmin() {
    const userAdmin  = new User()
    userAdmin.name = 'superadmin'
    userAdmin.password = this.generateHashPassword('superadmin')
    userAdmin.role = UserRole.admin;
    userAdmin.status = UserStatus.active;
    userAdmin.email = 'superadmin@email.su';

   this.usersRepository.find()
      .then(users => {
        if(users.length === 0){
          this.usersRepository.save(userAdmin)
          .then(admin => {
            console.log('\x1b[36m%s\x1b[0m', "SUPER ADMIN INFO IN Users table:", admin)
            console.log('\x1b[36m%s\x1b[0m', 'Password: superadmin')
          })
        }
      })
	}
	
	public async update(user: UserDto) {
		const newUserData = this.userHelperDataGenerator(user)  //and fail here when no password
		try {
      await this.usersRepository
        .findOneOrFail({id: user.id});  // if no found its go to catch

			return this.usersRepository
				.save({...newUserData, id: user.id})
		} catch(e) {
			throw new HttpException('Server error, can edit this user', HttpStatus.INTERNAL_SERVER_ERROR);
		}
	}

	public findAllUsers(){
		return this.usersRepository.find()
	}
}