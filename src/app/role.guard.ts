import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, from } from 'rxjs';
import { AuthService } from './auth.service';
import { JwtHelperService } from '@auth0/angular-jwt'

@Injectable({
    providedIn: 'root'
})
export class RoleGuard implements CanActivate {
    constructor(private auth: AuthService, private jwtHelper: JwtHelperService, private router: Router) {

    }
    canActivate(
        next: ActivatedRouteSnapshot,
        state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        var token = localStorage.getItem("jwt");

        var decodetoken = this.jwtHelper.decodeToken(token);
        if (token && !this.jwtHelper.isTokenExpired(token) && +decodetoken.roleid == 1) {
            return true;
        }
        this.router.navigate(["/product"]);
        return false;
    }
}
