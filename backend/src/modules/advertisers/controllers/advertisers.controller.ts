import { Body, Controller, UseGuards, Get, Param, Post, Request, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { AdvertisersGuard } from '../../../guards/advertisers.guards ';
import { Advertisers } from '../entities/advertisers.entity';
import { AdvertisersService } from '../services/advertisers.service';

@Controller('advertisers')
export class AdvertisersController {
  private advertisersRepository: Repository<Advertisers>;

  constructor(private readonly advertisersService: AdvertisersService,
    private connection: Connection,)  {
    this.advertisersRepository = this.connection.getRepository(Advertisers)
  }

    @Get('/all')
      async getAllAdvertisers(@Request() req): Promise<any | null> {
        return await this.advertisersService.editAdvertisersArrForUI()
      }

    @UseGuards(AdvertisersGuard)
    @Post('/create')
      async createAdvertiser(@Body() body: any): Promise<Advertisers> {
      const {email ,id, name, managerId, company, status } = body.advertiser;
      const newAdvertiser= new Advertisers();
        newAdvertiser.id = id;
        newAdvertiser.company = company;
        newAdvertiser.managerId = managerId;
        newAdvertiser.email = email;
        newAdvertiser.name = name;
        newAdvertiser.status = status;
      
      return await this.advertisersRepository.save(newAdvertiser)
    }
    
    @Post('/offers')
    async getOffersList(@Body() body: any): Promise<any> {
      return await this.advertisersService.getOffersList(body.id)
    }
    
    @Put('/edit')
    // @UseGuards(AdvertisersGuard)
    async EditAdvertiser(@Body() body: any): Promise<Advertisers> {
    const {id} = body.advertiser;
    const newAdvertiserData = await this.advertisersService.advertiserHelperDataGenerator(body.advertiser)
    return await this.advertisersRepository
       .createQueryBuilder()
       .update(Advertisers)
       .set(newAdvertiserData)
       .where({id: id})
       .execute()
       .then(result => {
         throw new HttpException('Advertiser edit', HttpStatus.OK);
       })
  }
}