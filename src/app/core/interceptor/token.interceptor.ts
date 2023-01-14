import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../service/auth.service";

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (!request.url.includes("auth")) {
      request = request.clone({
        setHeaders: {
          Authorization: `${AuthService.getTokenType()} ${AuthService.getToken()}`
        }
      });
      request.headers.append("Authorization", `${AuthService.getTokenType()} ${AuthService.getToken()}`);
    }
    return next.handle(request);
  }
}
