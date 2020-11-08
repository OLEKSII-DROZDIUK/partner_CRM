import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Offers } from '../../offers/entities/offers.entity';
import { Advertisers  } from '../entities/advertisers.entity';

@Injectable()
export class AdvertisersService {
    private advertisersRepository: Repository<Advertisers>;
    private offersRepository: Repository<Offers>;
    
    constructor(private connection: Connection,)  {
      this.advertisersRepository = this.connection.getRepository(Advertisers);
      this.offersRepository = this.connection.getRepository(Offers);
    }

  public async editAdvertisersArrForUI() {
    const uiObjAdvertisers  =  []; 

    await this.advertisersRepository
        .find({ relations: ["manager"] })
        .then(addUsers => {
            addUsers.map(obj => {
                const {id, company, managerId,email, name, status } = obj;
                uiObjAdvertisers.push({ id,company,managerId,email,name,status,manager: obj.manager.name,
                })
            })
        })
    return  uiObjAdvertisers
  };

  public advertiserHelperDataGenerator(newData: any) {
    const { email , name, company, status,managerId } = newData;
      return {
        company: company,
        managerId:managerId,
        email: email,
        name: name,
        status:status
      }
  };

  public async getOffersList(id: string) {
    const offers = await this.offersRepository
    .find({where: {advertiserId: id }})

    return offers
  }

}