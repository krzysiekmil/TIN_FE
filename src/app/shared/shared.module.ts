import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnimalsCardComponent } from './animals-card/animals-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";



@NgModule({
  declarations: [
    AnimalsCardComponent,
    ConfirmDialogComponent,
    InfoDialogComponent
  ],
  exports: [
    AnimalsCardComponent
  ],
    imports: [
        CommonModule,
        MatCardModule,
        MatButtonModule,
        MatDialogModule,
        RouterLink
    ]
})
export class SharedModule { }
