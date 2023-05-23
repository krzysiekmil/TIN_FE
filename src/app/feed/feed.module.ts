import { NgModule } from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

import { FeedRoutingModule } from './feed-routing.module';
import { FeedListComponent } from './feed-list/feed-list.component';
import {ScrollingModule} from "@angular/cdk/scrolling";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";
import {MatCardModule} from "@angular/material/card";
import {MatDividerModule} from "@angular/material/divider";
import { FeedCardComponent } from './feed-card/feed-card.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule} from "@angular/material/icon";


@NgModule({
  declarations: [
    FeedListComponent,
    FeedCardComponent
  ],
    imports: [
        CommonModule,
        FeedRoutingModule,
        ScrollingModule,
        MatProgressSpinnerModule,
        MatCardModule,
        MatDividerModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        NgOptimizedImage
    ]
})
export class FeedModule { }
