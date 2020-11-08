import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Offers } from '../entities/offers.entity';

@Injectable()
export class OffersService {
    private offersRepository: Repository<Offers>;

    constructor(private connection: Connection,)  {
        this.offersRepository = this.connection.getRepository(Offers)
    }

    public async editOfferArrForUI() {
        const uiObjOffers  =  []; 

        await this.offersRepository
            .find({ relations: ["advertiser"] })
            .then(addAdvertiser => {
                addAdvertiser.map(obj => {
                    const {id, allowedCountries, advertiserId,  payout, name, status } = obj;
                    uiObjOffers.push({ 
                        id, 
                        allowedCountries, 
                        advertiserId,
                        payout, 
                        name, 
                        status,
                        company: obj.advertiser.company,
                    })
                })
            })
        return uiObjOffers;
    };

    public async offerHelperDataGenerator(newData: any)  {
        const { id, name, advertiserId, allowedCountries, payout, status } = newData;
        return {
            name:  name,
            advertiserId: advertiserId,
            allowedCountries:  allowedCountries,
            payout: payout,
            status:  status,
        }
    };



}