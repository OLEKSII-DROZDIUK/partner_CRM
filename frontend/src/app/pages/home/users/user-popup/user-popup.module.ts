import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserPopupComponent  } from './user-popup.component';

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
        UserPopupComponent
	],
	exports: [
		UserPopupComponent
	],
})
export class UserPopupModule { }
