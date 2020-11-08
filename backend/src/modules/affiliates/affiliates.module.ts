import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';


import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AffiliatesService } from './services/affiliates.service';
import { AffiliatesController } from './controllers/affiliates.controller';
import { Affiliates } from './entities/affiliates.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Affiliates]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AffiliatesController],
  providers: [AffiliatesService],
})
export class AffiliatesModule {}
