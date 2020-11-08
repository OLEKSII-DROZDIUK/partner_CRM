import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';

const routes: Routes = [
	{ path: '',     component: LoginComponent },
	{ path: '**',   canLoad: [false] }
];
export const LOGIN_ROUTING: ModuleWithProviders<any> = RouterModule.forChild(routes);
