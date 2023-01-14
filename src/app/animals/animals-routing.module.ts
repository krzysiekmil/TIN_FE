import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AnimalsListComponent} from "./animals-list/animals-list.component";
import {AnimalsFormComponent} from "./animals-form/animals-form.component";
import {UserAnimalsListComponent} from "./user-animals-list/user-animals-list.component";
import {AnimalsDetailsComponent} from "./animals-details/animals-details.component";

const routes: Routes = [
  {
    path: '',
    component: AnimalsListComponent,
  },
  {
    path: "add",
    component: AnimalsFormComponent
  },
  {
    path: "me",
    component: UserAnimalsListComponent
  },
  {
    path: ":id",
    component: AnimalsDetailsComponent,
  },
  {
    path: ":id/edit",
    component: AnimalsFormComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnimalsRoutingModule {
}
