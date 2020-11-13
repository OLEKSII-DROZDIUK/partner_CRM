import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AffiliateDto } from '../dto/affiliate.dto';
import { Affiliates } from '../entities/affiliates.entity';


@Injectable()
export class AffiliatesService {

    constructor(
			@InjectRepository(Affiliates)
			private readonly affiliatesRepository: Repository<Affiliates>,
    ) {}

    public findAllAffiliate() {
        return this.editAffiliatesArrForUI()
    }

    public async editAffiliatesArrForUI() {
			const uiObjAffiliates: AffiliateDto[] = []; 

			await this.affiliatesRepository
				.find({ relations: ["manager"] })
				.then(addAdvertiser => {
					addAdvertiser.map((objAffiliate) => {
						const {id, name, company, managerId, email, status } = objAffiliate;

						uiObjAffiliates.push({ 
							id, 
							name,
							company,
							managerId,
							email,
							status,
							manager: objAffiliate.manager.name, // it's user name from table Users
						})
					})
				})
      return uiObjAffiliates;
    };

    public create(affiliate: AffiliateDto) {
			const { id, company, managerId, email, name, status } = affiliate;

			const newAffiliate= new Affiliates ();
				newAffiliate.id = id;
				newAffiliate.name = name;
				newAffiliate.company = company;
				newAffiliate.managerId = managerId;
				newAffiliate.email = email;
				newAffiliate.status = status;

			try {
				return this.affiliatesRepository.save(newAffiliate)
			} catch(e) {
				throw new HttpException('Server error, can create affiliate', HttpStatus.INTERNAL_SERVER_ERROR);
			}
    }
    
    public async update(affiliate: AffiliateDto) {
				const { id } = affiliate
        const newAffiliateData = this.affiliatesHelperDataGenerator(affiliate)

			try {
				await this.affiliatesRepository
					.findOneOrFail({ id });  // if no found its go to catch

				return await this.affiliatesRepository
					.save({...newAffiliateData, id})
			} catch(e) {
				throw new HttpException('Server error, can update this affiliate', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }

    public affiliatesHelperDataGenerator(newData: AffiliateDto)  {
        const { company, email, name, status } = newData;
        return {
            name:  name,
            company: company,
            email: email,
            status:  status,
        }
    };
}