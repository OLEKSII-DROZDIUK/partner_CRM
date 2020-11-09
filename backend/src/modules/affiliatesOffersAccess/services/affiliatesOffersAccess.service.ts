import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Affiliates } from '../../affiliates/entities/affiliates.entity';
import { Offers } from '../../offers/entities/offers.entity';

@Injectable()
export class AffiliatesOffersAccessStatusService {
    private offersRepository: Repository<Offers>;
    private affiliatesRepository: Repository<Affiliates>;

    constructor(private connection: Connection,)  {
        this.affiliatesRepository = this.connection.getRepository(Affiliates)
        this.offersRepository = this.connection.getRepository(Offers)
    }

    public async filterForOfferId(id: string) {

        const offer: Offers = await this.offersRepository.findOneOrFail({
            relations: ['affiliatesOffersAccesses', 'affiliatesOffersAccesses.affiliate'],
            where: {
                id
            }
        });

        const affiliates: Affiliates[] = offer.affiliatesOffersAccesses.map(aoa => aoa.affiliate);
        return affiliates;
    };

    public async filterForAffiliateId(id: string) {

        const affiliate: Affiliates = await this.affiliatesRepository.findOneOrFail({
            relations: ['affiliatesOffersAccesses', 'affiliatesOffersAccesses.offer'],
            where: {
                id
            }
        });

        const offers: Offers[] = affiliate.affiliatesOffersAccesses.map(aoa => aoa.offer);

        return offers;
    };


}