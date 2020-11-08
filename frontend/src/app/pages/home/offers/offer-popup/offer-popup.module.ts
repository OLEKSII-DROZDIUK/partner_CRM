import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { OfferPopupComponent } from './offer-popup.component';

export function playerFactory() {
	return player;
};

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		LottieModule.forRoot({ player: playerFactory }),
	],
	declarations: [
        OfferPopupComponent
	],
	exports: [
		OfferPopupComponent
	],
})
export class OfferPopupModule { }
