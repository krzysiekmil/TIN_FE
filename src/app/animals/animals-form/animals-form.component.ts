import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AnimalsService} from "../animals.service";
import {MatDialog} from "@angular/material/dialog";
import {defer, firstValueFrom, from, mapTo, mergeMap, of, switchMap} from "rxjs";
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
export class AnimalsFormComponent implements OnInit {
  public form!: FormGroup;
  private id: string | null = null;

  constructor(private fb: FormBuilder, private animalsService: AnimalsService, private matDialog: MatDialog, private router: Router, private route: ActivatedRoute) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.initValue();
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: [null, Validators.required],
      description: [null, Validators.maxLength(255)],
      type: [null, Validators.required],
      dateOfBirth: [null, Validators.required],
      rules: [null, Validators.requiredTrue]
    })
  }

  public submit(): void {
    if(this.id){
      this.update();
    }
    else
      this.create();

  }

  private create(): void {
    this.animalsService.create(this.form.value)
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

  private update(): void{
    this.animalsService.update({id: this.id, ...this.form.value})
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

  private initValue(): void {
    this.id = this.route.snapshot.paramMap.get("id")
    if (!this.id) {
      return;
    }

    firstValueFrom(this.animalsService.getOne(this.id as unknown as number))
      .then(value => {
        if (!value) {
          return
        }
        this.form.patchValue(value)

      });
  }
}
