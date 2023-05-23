import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UsersListComponent} from "./users-list/users-list.component";
import {SettingsComponent} from "./settings/settings.component";
import {UserAdminDetailsComponent} from "./user-admin-details/user-admin-details.component";

const routes: Routes = [
  {
    path: 'users',
    children: [
      {
        path: '',
        component: UsersListComponent
      },
      {
        path: ':id',
        component: UserAdminDetailsComponent
      }
    ]
  },
  {
    path: 'settings',
    component: SettingsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
