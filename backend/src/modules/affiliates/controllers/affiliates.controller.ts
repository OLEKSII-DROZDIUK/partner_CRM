import { Body, Controller, UseGuards, Get, Param, Post, Request, Put, HttpException, HttpStatus } from '@nestjs/common';
import { Connection, Repository } from 'typeorm';
import { AffiliatesGuard } from '../../../guards/affiliates.guards';
import { Affiliates } from '../entities/affiliates.entity';
import { AffiliatesService } from '../services/affiliates.service';

@Controller('affiliates')
export class AffiliatesController {
  private affiliatesRepository: Repository<Affiliates>;

  constructor(private readonly affiliatesService: AffiliatesService,
    private connection: Connection,)  {
    this.affiliatesRepository = this.connection.getRepository(Affiliates)
  }

    @Get('/all')
      async getAllAffiliates(@Request() req): Promise<any | null> {
        return await this.affiliatesService.editAffiliatesArrForUI()
      }

    @UseGuards(AffiliatesGuard)
    @Post('/create')
      async createAdvertiser(@Body() body: any): Promise<Affiliates> {
      const {id, company, managerId, email, name, status } = body.affiliate;

      const newAffiliate= new Affiliates ();
          newAffiliate.id = id;
          newAffiliate.name = name;
          newAffiliate.company = company;
          newAffiliate.managerId = managerId;
          newAffiliate.email = email;
          newAffiliate.status = status;
        return await this.affiliatesRepository.save(newAffiliate)
      }
      
      @Put('/edit')
      @UseGuards(AffiliatesGuard)
      async EditAdvertiser(@Body() body: any): Promise<Affiliates> {
      const {id } = body.affiliate;
      const newAffiliateData = await this.affiliatesService.affiliatesHelperDataGenerator(body.affiliate)
      return await this.affiliatesRepository
        .createQueryBuilder()
        .update(Affiliates)
        .set(newAffiliateData)
        .where({id: id})
        .execute()
        .then(result => {
          throw new HttpException('Affiliate edit', HttpStatus.OK);
        })
    }
}