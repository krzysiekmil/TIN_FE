import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {ActivatedRoute, Router} from "@angular/router";
import {PostService} from "../post.service";
import {concatMap, firstValueFrom, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {map, take} from "rxjs/operators";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";

@Component({
  selector: 'tin-post-form',
  templateUrl: './post-form.component.html',
  styleUrls: ['./post-form.component.scss']
})
export class PostFormComponent implements OnInit, OnDestroy{
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  protected readonly String = String;

  public form!: FormGroup;
  public imageForm!: FormControl;
  public image!: string | null;

  private id!: number;
  private file!: File;
  constructor(private formBuilder: FormBuilder, private matDialog: MatDialog, private activatedRoute: ActivatedRoute, private router: Router, private postService: PostService) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initValue();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }


  private initForm(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      content: [null, Validators.max(1024)],
    })

    this.imageForm = new FormControl();
    this.imageForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(data => this.file = data);
  }

  private initValue(): void {
    if(!this.activatedRoute.snapshot.paramMap.has("id")){
      return;
    }

    this.id = Number(this.activatedRoute.snapshot.paramMap.get('id'));

    firstValueFrom(this.postService.getOne(this.id))
      .then(data => {
        this.form.patchValue(data);
        this.image = data.image;
      })
  }

  public submit(): void {

    const observable = this.id ? this.postService.update(this.id, this.file, this.form.value) : this.postService.create(this.file, this.form.value)

    observable
      .pipe(
        take(1),
        map(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: 'Pet portal',
            message: 'The post has been saved'
          }
        })),
        mergeMap((dialog) => dialog.afterClosed()),
        concatMap(() => this.router.navigate(["/feed"])),
        take(1)
      )
      .subscribe()

  }

  public removeImage(): void {
    this.image = null;
    this.form.get("image")?.setValue(null);
  }

}
