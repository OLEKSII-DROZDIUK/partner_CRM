import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material
import { MatButtonModule } from '@angular/material/button';
import { OffersComponent } from './offers.component';
import { OfferPopupModule } from './offer-popup/offer-popup.module';
import { OfferDetailModule } from './offer-detail/offer-detail.module';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		OfferPopupModule,
		OfferDetailModule
	],
	declarations: [
        OffersComponent,
	],
	exports: [
		OffersComponent,
	],
})
export class OffersModule { }
