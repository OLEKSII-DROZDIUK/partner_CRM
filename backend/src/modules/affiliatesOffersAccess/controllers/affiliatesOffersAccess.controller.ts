import {  Controller, Get, Post, Request } from '@nestjs/common';
import { Connection, Repository, getConnection} from 'typeorm';
import { Affiliates } from '../../affiliates/entities/affiliates.entity';
import { Offers } from '../../offers/entities/offers.entity';
import { AffiliatesOffersAccess } from '../entities/affiliatesOffersAccess.entity';
import { AffiliatesOffersAccessStatusService } from '../services/affiliatesOffersAccess.service';

@Controller('affilite-offer-access')
export class AffiliatesOffersAccessController {
  private affilOfferRepository: Repository<AffiliatesOffersAccess>;

  constructor(private readonly affiliatesService: AffiliatesOffersAccessStatusService,
    private connection: Connection,)  {
    this.affilOfferRepository = this.connection.getRepository(AffiliatesOffersAccess)
  }

    @Post('/get-offers')   //get list offers by id affiiate
    async findOffersById(@Request() req): Promise<Offers[] | []> {
      return await this.affiliatesService.filterForAffiliateId(req.body.id)
    }

    @Post('/get-affiliates')  //get list off affiliates by id offer
    async findAffiliatesById(@Request() req): Promise<Affiliates[] | []> {
      return await this.affiliatesService.filterForOfferId(req.body.id)
  }
  
  @Get('/all')
    async getAllAffiliatesOffersAccess(): Promise<AffiliatesOffersAccess[] | null> {
      return await this.affilOfferRepository.find()
    }
	
	@Post('/create')
	async createNewItem(@Request() req): Promise<AffiliatesOffersAccess | null> {
		const newItem =  new AffiliatesOffersAccess()
		newItem.affiliateId = req.body.affiliateId;
		newItem.status =  req.body.status;  // нигде не указано, где можно устанавливать статус , поэтому всегда активен
		newItem.offerId = req.body.offerId;

		return await this.affilOfferRepository.save(newItem)
	}

  @Post('/del')
  async deleteConnect(@Request() req): Promise<any | null> {
    return await getConnection()
      .createQueryBuilder()
      .delete()
      .from(AffiliatesOffersAccess)
      .where({affiliateId: req.body.affiliateId, offerId: req.body.offerId})
      .execute();
  }
      
}