import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersComponent } from './users.component';
import { UserPopupModule } from './user-popup/user-popup.module';
// material
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@NgModule({
	imports: [
		CommonModule,
		MatButtonModule,
		UserPopupModule,
		MatFormFieldModule,
		MatInputModule
	],
	declarations: [
        UsersComponent,
	],
	exports: [
		UsersComponent,
	],
})
export class UsersModule { }
