import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// material
import { MatButtonModule } from '@angular/material/button';
import { AffiliatesComponent } from './affiliates.component';
import { AffiliatePopupModule } from './affiliate-popup/affiliate-popup.module';
import { AffiliateDetailDetailModule } from './affiliate-detail/affiliate-detail.module';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		AffiliatePopupModule,
		AffiliateDetailDetailModule,
	],
	declarations: [
        AffiliatesComponent,
	],
	exports: [
		AffiliatesComponent,
	],
})
export class AffiliatesModule { }
