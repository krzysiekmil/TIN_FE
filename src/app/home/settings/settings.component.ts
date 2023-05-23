import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {catchError, firstValueFrom, mergeMap, ReplaySubject, takeUntil} from "rxjs";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";
import {first, take, tap} from "rxjs/operators";
import {UserService} from "../../core/service/user.service";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'tin-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  protected readonly String = String;

  public form!: FormGroup;
  public passwordForm!: FormGroup;
  public hide: boolean = true;
  public imageForm!: FormControl;
  public image!: string | null;

  private id!: number;
  private file!: File;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private matDialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.form = this.formBuilder.group({
      firstName: [null, ],
      lastName: [null],
      dateOfBirth: [null],
      email: [null, Validators.email],
      image: []
    });

    this.passwordForm = this.formBuilder.group({
      password: [null, [Validators.required, Validators.min(8)]],
      newPassword: [null, [Validators.required, Validators.min(8)]],
      repeatPassword: [null, [Validators.required, Validators.min(8)]]
    });

    this.userService.getMe().pipe(
      tap((data) => this.form.patchValue(data)),
      take(1),
      takeUntil(this.destroyed$)
    )
      .subscribe();

    this.imageForm = new FormControl();
    this.imageForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(data => this.file = data)
  }

  public ngOnDestroy(): void {
    this.destroyed$.next(true);
    this.destroyed$.complete();
  }

  public submit(): void {
    firstValueFrom(this.userService.updateMe(this.form.value, this.file)
      .pipe(
        mergeMap(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: "Account has been updated!",
            confirmText: "Ok"
          }
        }).afterClosed()),
        catchError(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: "An error has occurred please try again or contact administration",
            confirmText: "Ok",
          }
        }).afterClosed()),
        first()
      ));

  }

  public submitPassword(): void {
    firstValueFrom(this.userService.updatePassword(this.passwordForm.value)
      .pipe(
        mergeMap(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: "Account password has been updated!",
            confirmText: "Ok"
          }
        }).afterClosed()),
        catchError(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: "Pet Portal",
            message: "An error has occurred please try again or contact administration",
            confirmText: "Ok",
          }
        }).afterClosed()),
        first()
      ));
  }

  public removeImage(): void {
    this.image = null;
    this.form.get("image")?.setValue(null);
  }

}
