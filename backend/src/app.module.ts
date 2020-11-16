import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

import { User } from './modules/users/entities/users.entity';
// modules
import { UsersModule }  from  './modules/users/users.module';
import { AuthModule } from  './modules/auth/auth.module'
import { AdvertisersModule } from './modules/advertisers/advertisers.module';
import { OffersModule } from './modules/offers/offers.module';
import { AffiliatesModule } from './modules/affiliates/affiliates.module';
import { AffiliatesOffersAccessModule } from './modules/affiliatesOffersAccess/affiliatesOffersAccess.module';

import configuration from '../config/configuration';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      entities: [User],
    }),
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ configuration ]
    }),
    AuthModule,
    UsersModule,
    AdvertisersModule,
    OffersModule,
    AffiliatesModule,
    AffiliatesOffersAccessModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
