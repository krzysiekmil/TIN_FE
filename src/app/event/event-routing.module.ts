import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {EventFormComponent} from "./event-form/event-form.component";
import {EventListComponent} from "./event-list/event-list.component";
import {EventDetailsComponent} from "./event-details/event-details.component";

const routes: Routes = [
  {
    path: "",
    component: EventListComponent
  },
  {
    path: "add",
    component: EventFormComponent
  },
  {
    path: ":id",
    component: EventDetailsComponent
  },
  {
    path: ":id/edit",
    component: EventFormComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EventRoutingModule { }
