import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage, provideImgixLoader} from '@angular/common';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import { UserDetailsComponent } from './user-details/user-details.component';
import {UserRoutingModule} from "./user-routing.module";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {SharedModule} from "../shared/shared.module";
import { UserListComponent } from './user-list/user-list.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDividerModule} from "@angular/material/divider";
import {MatIconModule} from "@angular/material/icon";
import {MatPaginatorModule} from "@angular/material/paginator";
import { UserCardComponent } from './user-card/user-card.component';
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {ReactiveFormsModule} from "@angular/forms";
import {MatChipsModule} from "@angular/material/chips";
import {MatExpansionModule} from "@angular/material/expansion";
import {CoreModule} from "../core/core.module";
import {environment} from "../../environments/environment";



@NgModule({
  declarations: [
     UserDetailsComponent,
     UserListComponent,
     UserCardComponent
  ],
    imports: [
        UserRoutingModule,
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatProgressSpinnerModule,
        SharedModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatPaginatorModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        NgxMatDatetimePickerModule,
        ReactiveFormsModule,
        MatChipsModule,
        MatExpansionModule,
        NgOptimizedImage,
    ],
  providers: [
    provideImgixLoader(`${environment.files}/`)
  ]
})
export class UserModule { }
