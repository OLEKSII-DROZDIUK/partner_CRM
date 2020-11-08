import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { OfferDetailComponent } from './offer-detail.component';
import { OfferDetailAddModule } from './offer-detail-add/offer-detail-add.module';
// material
import { MatButtonModule } from '@angular/material/button';


@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		OfferDetailAddModule
	],
	declarations: [
        OfferDetailComponent
	],
	exports: [
		OfferDetailComponent
	],
})
export class OfferDetailModule { }
