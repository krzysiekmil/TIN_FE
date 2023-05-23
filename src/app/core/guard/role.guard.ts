import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";
import decode from "jwt-decode";
import {UserRole} from "../../shared/UserRole";

@Injectable({
  providedIn: 'root'
})
export class RoleGuard implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot): boolean {
    const expectedRole = route.data.expectedRole;
    const token = AuthService.getToken();
    if (!token)
      return false;
    const tokenPayload: any = decode(token);
    if (this.auth.isTokenValid() && expectedRole.some((role: UserRole) => tokenPayload.roles.includes(role))) {
      return true;
    } else {
      this.router.navigate(['home']);
      return false;
    }
  }
}
