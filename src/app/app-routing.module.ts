import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home/home-page/home-page.component";
import {LoginComponent} from "./home/login/login.component";
import {SignUpComponent} from "./home/sign-up/sign-up.component";
import {AuthGuard} from "./core/guard/auth.guard";

const routes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "sing-up",
    component: SignUpComponent
  },
  {
    path: "animals",
    loadChildren: () => import("./animals/animals.module").then(m => m.AnimalsModule),
    canActivate: [AuthGuard]
  },
  // {
  //   path: "**",
  //   redirectTo: ''
  // }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
