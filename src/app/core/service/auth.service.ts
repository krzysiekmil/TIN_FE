import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";
import {LoginResponse} from "../model/login-response";
import {MatDialog} from "@angular/material/dialog";
import {HttpClient} from "@angular/common/http";
import {UserRole} from "../../shared/UserRole";
import {environment} from "../../../environments/environment";
import {JwtHelperService} from "@auth0/angular-jwt";
import decode from "jwt-decode";
import {tap} from "rxjs/operators";


@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private static loginApi: string = "/login";

  public isUserAuthenticated: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public user: any = {};
  private roles: UserRole[] | string[] = [];

  constructor(private http: HttpClient, private jwtHelper: JwtHelperService, private matDialog: MatDialog) {
  }

  public login(credential: object): Observable<LoginResponse> {
    return this.http.post(environment.api + "/auth", credential)
      .pipe(
        tap((response: any) =>{
          this.roles = response.roles
        }),
        tap(response => AuthService.saveToken(response)),
        tap(() => this.isUserAuthenticated.next(true))
      );
  }

  public signUp(dto: object): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(environment.api + "/users", dto)

  }

  public isTokenValid(): boolean {
    const token = AuthService.getToken();
    if (!token) {
      return false;
    }

    const isValid = !this.jwtHelper.isTokenExpired(token);
    this.isUserAuthenticated.next(isValid);
    const {roles, sub, jti} = decode(token) as any;
    this.user.username = sub;
    this.user.role = roles;
    this.user.id = jti;

    if (!isValid) {
      AuthService.removeToken();
    }

    return isValid;
  }

  public logout(): void {
    AuthService.removeToken();
    this.isUserAuthenticated.next(false);
  }

  public static hasRole(role: UserRole | string): boolean {
    const token = AuthService.getToken();
    if (token) {
      const roles = (decode(token) as any).roles || [];
      return roles.includes(role)
    }
    return false;
  }

  public static getUserRoles(): Array<string> {
    const token = AuthService.getToken();
    if (!token)
      return [];
    // @ts-ignore
    return decode(token).roles
  }

  public static getToken(): string | null {
    return window.sessionStorage.getItem('accessToken');
  }

  public static getTokenType(): string | null {
    return window.sessionStorage.getItem('tokenType');
  }

  private static saveToken(token: any): void {
    window.sessionStorage.setItem('tokenType', token.type);
    window.sessionStorage.setItem('accessToken', token.token);
  }

  private static removeToken() {
    window.sessionStorage.removeItem("tokenType");
    window.sessionStorage.removeItem("accessToken");
  }
}
