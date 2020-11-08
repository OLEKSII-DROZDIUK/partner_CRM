import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OfferDetailAddComponent } from './offer-detail-add.component';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
// material
import { MatButtonModule } from '@angular/material/button';

export function playerFactory() {
	return player;
};

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		LottieModule.forRoot({ player: playerFactory }),
	],
	declarations: [
		OfferDetailAddComponent,
	],
	exports: [
		OfferDetailAddComponent,
	],
})
export class OfferDetailAddModule { }
