import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Feed} from "../../core/model/feed";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {PostService} from "../../post/post.service";
import {concatMap, filter, firstValueFrom, mergeMap} from "rxjs";
import {Comment} from "../../core/model/comment";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {tap} from "rxjs/operators";
import {MatDialog} from "@angular/material/dialog";
import {Router} from "@angular/router";

@Component({
  selector: 'tin-feed-card',
  templateUrl: './feed-card.component.html',
  styleUrls: ['./feed-card.component.scss']
})
export class FeedCardComponent implements OnInit {
  @Input() feed!: Feed
  @Output() refresh = new EventEmitter()
  form!: FormGroup;

  constructor(private formBuilder: FormBuilder, private postService: PostService, private matDialog: MatDialog, private router: Router) {
  }

  public ngOnInit(): void {
    this.initForm();
  }

  private initForm(): void {
    this.form = this.formBuilder.group(
      {
        content: [null, Validators.required]
      }
    )
  }


  protected readonly alert = alert;

  public submit() {
    firstValueFrom(this.postService.addComment(this.feed.contentId, this.form.getRawValue()))
      .then((comment: Comment) => this.feed.comments.push(comment))


  }

  public delete():void {
    firstValueFrom(this.matDialog.open(ConfirmDialogComponent, {data: {
        title: "Pet Portal",
        message: "Are you sure to remove animal?",
        confirmText: "Yes",
        cancelText: "No"
      }})
      .afterClosed()
      .pipe(
        tap(data => console.log(data)),
        filter(data => data === true),
        mergeMap(() => this.postService.delete(this.feed.contentId)),
    ))
      .then(() => this.refresh.emit())
  }
}
