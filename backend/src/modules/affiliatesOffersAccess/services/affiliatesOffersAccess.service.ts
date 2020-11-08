import { Injectable } from '@nestjs/common';
import { Connection, In, Repository } from 'typeorm';
import { Affiliates } from '../../affiliates/entities/affiliates.entity';
import { Offers } from '../../offers/entities/offers.entity';

import { AffiliatesOffersAccess } from '../entities/affiliatesOffersAccess.entity';

@Injectable()
export class AffiliatesOffersAccessStatusService {
    private AOARepository: Repository<AffiliatesOffersAccess>;
    private offersRepository: Repository<Offers>;
    private affiliatesRepository: Repository<Affiliates>;

    constructor(private connection: Connection,)  {
        this.AOARepository = this.connection.getRepository(AffiliatesOffersAccess)
        this.affiliatesRepository = this.connection.getRepository(Affiliates)
        this.offersRepository = this.connection.getRepository(Offers)
    }

    public async filterForOfferId(id: string) {

    return await this.AOARepository
        .find({where: {offerId: id }})
            .then(connectArr =>   {
                if(connectArr.length>0) {
                    return this.affiliatesRepository
                    .find({
                        where:{id: In(connectArr.map(arr  => arr.affiliateId))}
                    })
                } else {
                    return []
                };
            })
    };

    public async filterForAffiliateId(id: string) {
        return await this.AOARepository
        .find({where: {affiliateId: id }})
            .then(connectArr =>   {
                if(connectArr.length>0) {
                    return this.offersRepository
                        .find({
                            where:{id: In(connectArr.map(arr  => arr.offerId))}
                        })} 
                else {return []};
            })
    };


}