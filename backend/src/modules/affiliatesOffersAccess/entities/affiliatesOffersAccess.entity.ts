import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';

enum AffiliatesOffersAccessStatus {
  active =  'active',
  inactive = 'inactive'
}

@Entity()
export class AffiliatesOffersAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid4

  @PrimaryGeneratedColumn('uuid')
  affiliateId: string; // (id из таблицы offers);

  @PrimaryGeneratedColumn('uuid')
  offerId: string;  //uuid4 (id из таблицы affiliates)

  @Column({type: 'enum', enum: AffiliatesOffersAccessStatus})
  status: AffiliatesOffersAccessStatus; //(active/inactive)

}