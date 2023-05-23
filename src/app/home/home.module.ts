import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { HomePageComponent } from './home-page/home-page.component';
import {MatGridListModule} from "@angular/material/grid-list";
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatMomentDateModule} from "@angular/material-moment-adapter";
import {MatCheckboxModule} from "@angular/material/checkbox";
import {SharedModule} from "../shared/shared.module";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import { SettingsComponent } from './settings/settings.component';
import {MatDividerModule} from "@angular/material/divider";
import {MatTooltipModule} from "@angular/material/tooltip";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";



@NgModule({
  declarations: [
    HomePageComponent,
    LoginComponent,
    SignUpComponent,
    SettingsComponent
  ],
    imports: [
        MatSnackBarModule,
        CommonModule,
        MatGridListModule,
        MatCardModule,
        MatButtonModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatDatepickerModule,
        MatMomentDateModule,
        MatCheckboxModule,
        SharedModule,
        MatDividerModule,
        MatTooltipModule,
        NgOptimizedImage,
        NgxMatFileInputModule
    ]
})
export class HomeModule { }
