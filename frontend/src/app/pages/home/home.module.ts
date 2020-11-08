
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HOME_ROUTING } from './home.routing';
// Components
import { HomeComponent } from './home.component';
import { UsersModule }  from './users/users.module';
import { AdvertisersModule } from './advertisers/advertisers.module';
import { OffersModule } from './offers/offers.module';
import { AffiliatesModule } from './affiliates/affiliates.module';
//  material 
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from '@angular/material/button';
//service
import { RoleService } from '../../services/role.service';


@NgModule({
	imports: [
		CommonModule,
		HOME_ROUTING,
		MatListModule,
		UsersModule,
		AdvertisersModule,
		OffersModule,
		AffiliatesModule,
		MatButtonModule

	],
	declarations: [
		HomeComponent,
	],
	exports: [

	],
	providers: [
		RoleService
	]
})
export class HomeModule {}
