import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { AffiliatesOffersAccess } from '../../affiliatesOffersAccess/entities/affiliatesOffersAccess.entity';
import { User } from '../../users/entities/users.entity';
import { AffiliatesStatus } from './affiliateStatus.enum';

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

  @OneToMany(() => AffiliatesOffersAccess, affiliatesOffersAccess => affiliatesOffersAccess.affiliate)
  affiliatesOffersAccesses: AffiliatesOffersAccess[];
}