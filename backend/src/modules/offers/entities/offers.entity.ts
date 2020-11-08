import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Advertisers } from '../../advertisers/entities/advertisers.entity';

enum OfferStatus {
  active =  'active',
  inactive = 'inactive'
}

@Entity()
export class Offers {
  @PrimaryGeneratedColumn('uuid')
  id: string;  //uuid4

  @Column()
  name: string;

  @Column()
  advertiserId: string; //uuid4 (id из таблицы advertisers)

  @Column("int", { array: true })
  allowedCountries: string[]; //(массив ISO кодов разрешенных стран)

  @Column("decimal", { precision: 3, scale: 2 })
  payout: number;

  @Column({type: 'enum', enum: OfferStatus})
  status: OfferStatus; //(active/inactive)

  @ManyToOne(() => Advertisers, advertiser => advertiser.id)
  advertiser: Advertisers;
}