import {NgModule, Optional, SkipSelf} from '@angular/core';
import {CommonModule, NgIf} from '@angular/common';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {HeaderComponent} from './components/header/header.component';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";
import {MatMenuModule} from "@angular/material/menu";
import {JWT_OPTIONS, JwtHelperService} from "@auth0/angular-jwt";
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import {TokenInterceptor} from "./interceptor/token.interceptor";
import {UnauthorizedInterceptor} from "./interceptor/unauthorized.interceptor";
import {SharedModule} from "../shared/shared.module";


@NgModule({
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UnauthorizedInterceptor,
      multi: true
    },
    JwtHelperService,
    {provide: JWT_OPTIONS, useValue: JWT_OPTIONS}
  ],
  imports: [
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    NgIf,
    MatIconModule,
    MatMenuModule,
    MatDialogModule,
    RouterLink,
    SharedModule
  ],
  exports: [HttpClientModule, HeaderComponent],
  declarations: [
    HeaderComponent
  ]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error("CoreModule is already loaded. Import only in AppModule");
    }
  }
}
