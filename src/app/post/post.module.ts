import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage, provideImgixLoader} from '@angular/common';

import { PostRoutingModule } from './post-routing.module';
import { PostFormComponent } from './post-form/post-form.component';
import {MatButtonModule} from "@angular/material/button";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatOptionModule} from "@angular/material/core";
import {MatSelectModule} from "@angular/material/select";
import {NgxMatDatetimePickerModule} from "@angular-material-components/datetime-picker";
import {NgxMatFileInputModule} from "@angular-material-components/file-input";
import {MatCardModule} from "@angular/material/card";
import {ReactiveFormsModule} from "@angular/forms";
import {MatTooltipModule} from "@angular/material/tooltip";
import {environment} from "../../environments/environment";


@NgModule({
  declarations: [
    PostFormComponent
  ],
    imports: [
        CommonModule,
        PostRoutingModule,
        MatButtonModule,
        MatDatepickerModule,
        MatFormFieldModule,
        MatInputModule,
        MatOptionModule,
        MatSelectModule,
        NgxMatDatetimePickerModule,
        NgxMatFileInputModule,
        MatCardModule,
        ReactiveFormsModule,
        MatTooltipModule,
        NgOptimizedImage
    ],
  providers: [
    provideImgixLoader(`${environment.files}/`)
  ]
})
export class PostModule { }
