import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AffiliatesOffersAccessStatusService } from './services/affiliatesOffersAccess.service';
import { AffiliatesOffersAccess } from './entities/affiliatesOffersAccess.entity';
import { AffiliatesOffersAccessController } from './controllers/affiliatesOffersAccess.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AffiliatesOffersAccess]),
  ],
  controllers: [AffiliatesOffersAccessController],
  providers: [AffiliatesOffersAccessStatusService],
})
export class AffiliatesOffersAccessModule {}
