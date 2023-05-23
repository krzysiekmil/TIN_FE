import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EventRoutingModule } from './event-routing.module';
import { EventFormComponent } from './event-form/event-form.component';
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatIconModule} from "@angular/material/icon";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { NgxMatDatetimePickerModule, NgxMatTimepickerModule } from '@angular-material-components/datetime-picker';
import {NgxMatMomentModule} from "@angular-material-components/moment-adapter";
import {MatSelectModule} from "@angular/material/select";
import {MatButtonModule} from "@angular/material/button";
import { EventListComponent } from './event-list/event-list.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatPaginatorModule} from "@angular/material/paginator";
import {SharedModule} from "../shared/shared.module";
import { EventDetailsComponent } from './event-details/event-details.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatDialogModule} from "@angular/material/dialog";
import {MAT_MOMENT_DATE_ADAPTER_OPTIONS, MomentDateAdapter} from "@angular/material-moment-adapter";
import {DateAdapter, MAT_DATE_LOCALE} from "@angular/material/core";
import {MatCardModule} from "@angular/material/card";
import { EventMembersListComponent } from './event-members-list/event-members-list.component';
import {MatChipsModule} from "@angular/material/chips";
import {MatListModule} from "@angular/material/list";


@NgModule({
  declarations: [
    EventFormComponent,
    EventListComponent,
    EventDetailsComponent,
    EventMembersListComponent
  ],
  imports: [
    CommonModule,
    EventRoutingModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatDatepickerModule,
    NgxMatDatetimePickerModule,
    NgxMatTimepickerModule,
    NgxMatMomentModule,
    MatSelectModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    SharedModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatCardModule,
    MatChipsModule,
    MatListModule,
  ],
  providers: [

  ]
})
export class EventModule { }
