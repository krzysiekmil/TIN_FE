import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import { AnimalsCardComponent } from './animals-card/animals-card.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { InfoDialogComponent } from './info-dialog/info-dialog.component';
import {MatDialogModule} from "@angular/material/dialog";
import {RouterLink} from "@angular/router";
import { PostCardComponent } from './post-card/post-card.component';
import {MatExpansionModule} from "@angular/material/expansion";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import { EventCardComponent } from './event-card/event-card.component';
import {HasRoleDirective} from "./directive/has-role.directive";
import {AuthorizedDirective} from "./directive/authorized.directive";



@NgModule({
  declarations: [
    AnimalsCardComponent,
    ConfirmDialogComponent,
    InfoDialogComponent,
    PostCardComponent,
    EventCardComponent,
    HasRoleDirective,
    AuthorizedDirective
  ],
    exports: [
        AnimalsCardComponent,
        PostCardComponent,
        EventCardComponent,
      HasRoleDirective,
      AuthorizedDirective

    ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    RouterLink,
    MatExpansionModule,
    MatIconModule,
    MatDividerModule,
    NgOptimizedImage
  ]
})
export class SharedModule { }
