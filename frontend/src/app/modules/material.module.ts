import { NgModule } from '@angular/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatTabsModule} from '@angular/material/tabs';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import {MatListModule} from '@angular/material/list';

const MATERIAL_MODULES: any = [
	MatDialogModule,
	MatSelectModule,
	MatFormFieldModule,
	MatTabsModule,
	MatCardModule,
	MatInputModule,
	MatIconModule,
	MatExpansionModule,
	MatListModule
];

@NgModule({
  imports: [ ...MATERIAL_MODULES ],
  exports: [ ...MATERIAL_MODULES ],
})
export class MaterialModule {}
