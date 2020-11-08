import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AffiliateDetailAddComponent } from './affiliate-detail-add.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
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
		AffiliateDetailAddComponent,
	],
	exports: [
		AffiliateDetailAddComponent,
	],
})
export class AffiliateDetailAddModule { }
