import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertisersComponent } from './advertisers.component';
import { AdvertiserPopupModule } from './advertiser-popup/advertiser-popup.module';
import { AdvertiserDetailModule } from './advertiser-detail/advertiser-detail.module';
// material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		AdvertiserPopupModule,
		AdvertiserDetailModule,
	],
	declarations: [
        AdvertisersComponent,
	],
	exports: [
		AdvertisersComponent,
	],
})
export class AdvertisersModule { }
