import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../service/auth.service";
import {Router} from "@angular/router";

@Injectable()
export class UnauthorizedInterceptor implements HttpInterceptor {

  constructor(private router: Router, private authService:AuthService, private matDialog: MatDialog) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(
      tap((response: HttpEvent<any>) =>
          () => {
          },
        e => {
          if (e instanceof HttpErrorResponse && !request.url.includes("api/auth") && e.status === 401) {
            this.authService.logout();
            this.router.navigate(['login'])
            this.matDialog.open(InfoDialogComponent, {data: {title: 'Pet portal', message: 'Unauthorized please log in'}})
              .afterClosed()
              .toPromise()
              .then(()=> this.matDialog.closeAll());
          }
        })
    );
  }
}
