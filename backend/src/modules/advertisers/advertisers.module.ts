import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisersController } from './controllers/advertisers.controller';
import { Advertisers } from './entities/advertisers.entity';
import { AdvertisersService } from './services/advertisers.service';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthService } from '../auth/service/auth.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisers]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: configService.get<string>('JWT_EXPIRES_IN') }
      }),
      inject: [ConfigService]
    })
  ],
  controllers: [AdvertisersController],
  providers: [AdvertisersService, AuthService],
})
export class AdvertisersModule {}
