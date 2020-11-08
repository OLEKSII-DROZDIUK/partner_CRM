import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvertiserPopupComponent  } from './advertiser-popup.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';

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
        AdvertiserPopupComponent
	],
	exports: [
		AdvertiserPopupComponent
	],
})
export class AdvertiserPopupModule { }
