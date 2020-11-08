import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
//components
import { LoginComponent } from './pages/login/login.component';
//  helpers
import { AuthGuard } from './helpers/auth.guard';

const PAGE_ROTES: Routes = [
  { path: 'login', component: LoginComponent},
  { path: '', pathMatch: 'full', canActivate: [AuthGuard], loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule)},
  // otherwise redirect to home
  { path: '**', redirectTo: '/login' }
];

@NgModule({
  imports: [RouterModule.forRoot(PAGE_ROTES)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
