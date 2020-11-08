import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/users.entity';

enum AffiliatesStatus {
  active =  'active',
  inactive = 'inactive'
}

@Entity()
export class Affiliates {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid4

  @Column()
  name: string;

  @Column()
  company: string;

  @Column()
  managerId: string; //uuid4 (id из таблицы users)

  @Column()
  email: string;

  @Column({type: 'enum', enum: AffiliatesStatus})
  status: AffiliatesStatus; //(active/inactive)

  @ManyToOne(() => User, user => user.id)
  manager: User;
}