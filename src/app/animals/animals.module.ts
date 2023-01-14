import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AnimalsRoutingModule } from './animals-routing.module';
import { AnimalsListComponent } from './animals-list/animals-list.component';
import { AnimalsFormComponent } from './animals-form/animals-form.component';
import {SharedModule} from "../shared/shared.module";
import { UserAnimalsListComponent } from './user-animals-list/user-animals-list.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatSelectModule} from "@angular/material/select";
import { AnimalsDetailsComponent } from './animals-details/animals-details.component';
import { AnimalsDetailsManagementComponent } from './animals-details/animals-details-management/animals-details-management.component';
import {MatCardModule} from "@angular/material/card";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import { AnimalsDetailsCardComponent } from './animals-details/animals-details-card/animals-details-card.component';


@NgModule({
  declarations: [
    AnimalsListComponent,
    AnimalsFormComponent,
    UserAnimalsListComponent,
    AnimalsDetailsComponent,
    AnimalsDetailsManagementComponent,
    AnimalsDetailsCardComponent
  ],
  imports: [
    CommonModule,
    AnimalsRoutingModule,
    SharedModule,
    MatFormFieldModule,
    MatIconModule,
    MatDatepickerModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatSelectModule,
    MatCardModule,
    MatProgressSpinnerModule,
  ]
})
export class AnimalsModule { }
