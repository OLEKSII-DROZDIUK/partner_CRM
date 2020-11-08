import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AffiliatesOffersAccessStatusService } from './services/affiliatesOffersAccess.service';
import { AffiliatesOffersAccess } from './entities/affiliatesOffersAccess.entity';
import { AffiliatesOffersAccessController } from './controllers/affiliatesOffersAccess.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([AffiliatesOffersAccess]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AffiliatesOffersAccessController],
  providers: [AffiliatesOffersAccessStatusService],
})
export class AffiliatesOffersAccessModule {}
