import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Advertisers } from '../../advertisers/entities/advertisers.entity';
import { Affiliates } from '../../affiliates/entities/affiliates.entity';
import { UserRole } from './userRole.enum';
import { UserStatus } from './userStatus.enum';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid

  @Column()
  email: string;

  @Column()
  name: string;

  @Column()
  password: string; //hash

  @Column({type: 'enum', enum: UserRole})
  role: UserRole; //(admin/advertiserManager/affiliateManager)

  @Column({type: 'enum', enum: UserStatus})
  status: UserStatus; //(active/inactive)

  @OneToMany(type => Advertisers, advertisers => advertisers.managerId)
  advertisers: Advertisers[];

  @OneToMany(type => Affiliates, affiliates => affiliates.managerId)
  affiliates: Affiliates[];
}