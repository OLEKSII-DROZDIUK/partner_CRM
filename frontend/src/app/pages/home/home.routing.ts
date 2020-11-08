import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home.component';

const routes: Routes = [
	{ path: '',     component: HomeComponent },
	{ path: '**',   canLoad: [false] }
];
export const HOME_ROUTING: ModuleWithProviders<any> = RouterModule.forChild(routes);
