import { Body, Controller, UseGuards, Get, Param, Post, Request, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { AdvertisersGuard } from '../../../guards/advertisers.guards ';
import { Offers } from '../entities/offers.entity';
import { OffersService } from '../services/offers.service';

@Controller('offers')
export class OffersController {
  private offersRepository: Repository<Offers>;

  constructor(private readonly offerService: OffersService,
    private connection: Connection,)  {
    this.offersRepository = this.connection.getRepository(Offers)
  }

    @Get('/all')
      async getAllOffers(@Request() req): Promise<any | null> {
        return await this.offerService.editOfferArrForUI()
      }

    @UseGuards(AdvertisersGuard)
    @Post('/create')
      async createAdvertiser(@Body() body: any): Promise<Offers> {
      const {id, name, advertiserId, allowedCountries, payout, status } = body.offer;
      const newOffer = new Offers ();
          newOffer.id = id;
          newOffer.advertiserId = advertiserId;
          newOffer.allowedCountries = [];
          newOffer.payout = 0.00;
          newOffer.name = name;
          newOffer.status = status;
        return await this.offersRepository.save(newOffer)
      }
      
      @Put('/edit')
      @UseGuards(AdvertisersGuard)
      async EditAdvertiser(@Body() body: any): Promise<Offers> {
      const {id } = body.offer;
      const newOfferData = await this.offerService.offerHelperDataGenerator(body.offer)
      return await this.offersRepository
        .createQueryBuilder()
        .update(Offers)
        .set(newOfferData)
        .where({id: id})
        .execute()
        .then(result => {
          throw new HttpException('Offer edit', HttpStatus.OK);
        })
    }
}