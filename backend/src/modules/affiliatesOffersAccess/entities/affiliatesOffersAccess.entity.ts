import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Affiliates } from '../../affiliates/entities/affiliates.entity';
import { Offers } from '../../offers/entities/offers.entity';

enum AffiliatesOffersAccessStatus {
  active =  'active',
  inactive = 'inactive'
}

@Entity()
export class AffiliatesOffersAccess {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid4

  @Column('uuid')
  affiliateId: string; // (id из таблицы offers);

  @Column('uuid')
  offerId: string;  //uuid4 (id из таблицы affiliates)

  @Column({type: 'enum', enum: AffiliatesOffersAccessStatus})
  status: AffiliatesOffersAccessStatus; //(active/inactive)


  @ManyToOne(() => Affiliates, affiliate => affiliate.affiliatesOffersAccesses)
  @JoinColumn({ name: "affiliateId" })
  affiliate: Affiliates;

  @ManyToOne(() => Offers, offer => offer.affiliatesOffersAccesses)
  @JoinColumn({ name: "offerId" })
  offer: Offers;
  
}