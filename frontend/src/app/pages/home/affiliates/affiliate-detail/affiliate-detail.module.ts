import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AffiliateDetailComponent } from './affiliate-detail.component';
import { AffiliateDetailAddModule } from './affiliate-detail-add/affiliate-detail-add.module';
// material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule,
		AffiliateDetailAddModule,

	],
	declarations: [
		AffiliateDetailComponent,
	],
	exports: [
		AffiliateDetailComponent,
	],
})
export class AffiliateDetailDetailModule { }
