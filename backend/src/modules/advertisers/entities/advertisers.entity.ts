import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Offers } from '../../offers/entities/offers.entity';
import { User } from '../../users/entities/users.entity';

enum AdvertisersStatus {
    active =  'active',
    inactive = 'inactive'
}

@Entity()
export class Advertisers {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid4

  @Column()
  company: string;

  @Column()
  managerId: string; //uuid4  (id из таблицы users)

  @Column()
  email: string;

  @Column()
  name: string;

  @Column({type: 'enum', enum: AdvertisersStatus})
  status: AdvertisersStatus; //(active/inactive)

  @ManyToOne(() => User, user => user.id)
  manager: User;

  @OneToMany(() => Offers, offers => offers.id)
  advertisers: Offers[];
}