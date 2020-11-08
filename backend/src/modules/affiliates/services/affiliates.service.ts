import { Injectable } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { Affiliates } from '../entities/affiliates.entity';


@Injectable()
export class AffiliatesService {
    private affiliatesRepository: Repository<Affiliates>;

    constructor(private connection: Connection,)  {
        this.affiliatesRepository = this.connection.getRepository(Affiliates)
    }

    public async editAffiliatesArrForUI() {
        const uiObjAffiliates  =  []; 

        await this.affiliatesRepository
            .find({ relations: ["manager"] })
            .then(addAdvertiser => {
                addAdvertiser.map(obj => {
                    const {id, name, company, managerId,email, status, } = obj;
                    uiObjAffiliates.push({ 
                        id, 
                        name,
                        company,
                        managerId,
                        email,
                        status,
                        manager: obj.manager.name,
                    })
                })
            })
        return uiObjAffiliates;
    };

    public async affiliatesHelperDataGenerator(newData: any)  {
        const {company,email, name, status  } = newData;
        return {
            name:  name,
            company: company,
            email: email,
            status:  status,
        }
    };



}