import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {AnimalsService} from "../animals.service";
import {MatDialog} from "@angular/material/dialog";
import {defer, firstValueFrom, from, mapTo, mergeMap, of, ReplaySubject, switchMap, takeUntil} from "rxjs";
import {MatSnackBar} from "@angular/material/snack-bar";
import {map, take, tap} from "rxjs/operators";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";
import {ActivatedRoute, Router} from "@angular/router";
import {fromPromise} from "rxjs/internal/observable/innerFrom";

@Component({
  selector: 'tin-animals-form',
  templateUrl: './animals-form.component.html',
  styleUrls: ['./animals-form.component.scss']
})
export class AnimalsFormComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);

  public form!: FormGroup;
  public imageForm!: FormControl;
  public image!: string | null;

  private id!: number;
  private file!: File;

  constructor(private fb: FormBuilder, private animalsService: AnimalsService, private matDialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValue();
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.maxLength(255)],
      type: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      rules: [null, Validators.requiredTrue],
      image: []
    });

    this.imageForm = new FormControl();
    this.imageForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(data => this.file = data)
  }

  private initValue(): void {
    if (!this.route.snapshot.paramMap.has("id")) {
      return;
    }
    this.id = Number(this.route.snapshot.paramMap.get("id"));

    firstValueFrom(this.animalsService.getOne(this.id as unknown as number))
      .then(value => {
        if (!value) {
          return
        }
        this.form.patchValue(value)
        this.image = value.image
      });
  }

  public submit(): void {
    if (this.id) {
      this.update();
    } else {
      this.create();
    }

  }

  private create(): void {
    this.animalsService.create(this.file, this.form.value)
      .pipe(
        mergeMap(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: "Animal has been added :)"
          }
        }).afterClosed()),
        mergeMap(() => fromPromise(this.router.navigate(["animals", "me"]))),
        take(1)
      )
      .subscribe()
  }

  private update(): void {
    this.animalsService.update(this.id, this.file, {id: this.id, ...this.form.value})
      .pipe(
        mergeMap(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: `Animal ${this.form.value.name} has been updated :)`
          }
        }).afterClosed()),
        mergeMap(() => fromPromise(this.router.navigate(["animals", "me"]))),
        take(1)
      )
      .subscribe()
  }




  public removeImage(): void {
    this.image = null;
    this.form.get("image")?.setValue(null);
  }

  protected readonly String = String;
}
