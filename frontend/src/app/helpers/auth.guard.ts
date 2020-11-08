import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { AuthenticationService } from '@app/services/authentication.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(
        private router: Router,
        private authenticationService: AuthenticationService,
    ) { }

    private checkAccessExpHelper(token: string) {
        if(!token) return true
        const expiry = (JSON.parse(atob(token.split('.')[1]))).exp;
        return (Math.floor((new Date).getTime() / 1000)) >= expiry;
    }

    public canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const token = this.authenticationService.tokenValue;
        const tokenExp = this.checkAccessExpHelper(token)
        if (token  && !tokenExp) return true
        localStorage.removeItem('accessToken');
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url } });
        return false;
    }
}