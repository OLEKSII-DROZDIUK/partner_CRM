import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AdvertiserDetailComponent } from './advertiser-detail.component';

// material
import { MatButtonModule } from '@angular/material/button';

@NgModule({
	imports: [
		CommonModule,
		ReactiveFormsModule,
		FormsModule,
		MatButtonModule
	],
	declarations: [
        AdvertiserDetailComponent
	],
	exports: [
		AdvertiserDetailComponent
	],
})
export class AdvertiserDetailModule { }
