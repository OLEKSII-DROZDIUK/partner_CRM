import { Body, Controller, UseGuards, Get, Post, Put, UsePipes, ValidationPipe } from '@nestjs/common';
import { AffiliatesGuard } from '../../auth/guards/affiliates.guards';
import { AffiliateDto } from '../dto/affiliate.dto';
import { Affiliates } from '../entities/affiliates.entity';
import { AffiliatesService } from '../services/affiliates.service';

@Controller('affiliates')
export class AffiliatesController {
  constructor(
    private readonly affiliatesService: AffiliatesService)  
  { }

    @Get()
    private async getAll(): Promise<AffiliateDto[]> {
      return await this.affiliatesService.findAllAffiliate()
    }
  
    @Post()
    @UseGuards(AffiliatesGuard)
    @UsePipes(new ValidationPipe())
    private async create(@Body() body: AffiliateDto): Promise<Affiliates> {
      return await this.affiliatesService.create(body)
    }

    @Put('/update')
    @UseGuards(AffiliatesGuard)
    @UsePipes(new ValidationPipe())
    private async update(@Body() body: AffiliateDto): Promise<Affiliates> {
      return await this.affiliatesService.update(body)
    }
}