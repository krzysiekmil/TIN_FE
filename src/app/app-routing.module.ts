import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {HomePageComponent} from "./home/home-page/home-page.component";
import {LoginComponent} from "./home/login/login.component";
import {SignUpComponent} from "./home/sign-up/sign-up.component";
import {AuthGuard} from "./core/guard/auth.guard";
import {RoleGuard} from "./core/guard/role.guard";
import {UserRole} from "./shared/UserRole";
import {SettingsComponent} from "./home/settings/settings.component";

const routes: Routes = [
  {
    path: 'admin',
    loadChildren: () => import("./admin/admin.module").then(m => m.AdminModule),
    canActivate: [AuthGuard, RoleGuard],
    data: {
      expectedRole: [UserRole.ROLE_ADMIN]
    }
  },
  {
    path: "animals",
    loadChildren: () => import("./animals/animals.module").then(m => m.AnimalsModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'event',
    loadChildren: () => import("./event/event.module").then(m => m.EventModule),
    canActivate: [AuthGuard]
  },
  {
    path: "feed",
    loadChildren: () => import("./feed/feed.module").then(m => m.FeedModule),
    canActivate: [AuthGuard]
  },
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: 'post',
    loadChildren: () => import("./post/post.module").then(m => m.PostModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'settings',
    component: SettingsComponent,
    canActivate: [AuthGuard]

  },
  {
    path: "sing-up",
    component: SignUpComponent
  },
  {
    path: 'user',
    loadChildren: () => import("./user/user.module").then(m => m.UserModule),
    canActivate: [AuthGuard]
  },
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: "**",
    redirectTo: ''
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
