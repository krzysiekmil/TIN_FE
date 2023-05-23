import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/service/auth.service";
import {catchError, filter, firstValueFrom, mapTo, mergeMap} from "rxjs";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {first, tap} from "rxjs/operators";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";

@Component({
  selector: 'tin-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  public form!: FormGroup;
  public hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router:Router, private matDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.min(8)]],
      dateOfBirth: [null, Validators.required],
      rules: [null, Validators.requiredTrue],
      rodo: [null, Validators.requiredTrue]
    })

  }

  public submit(): void {
    firstValueFrom(this.authService.signUp(this.form.value)
      .pipe(
        mergeMap(() => this.matDialog.open(InfoDialogComponent, {data: {
            title: "Pet Portal",
            message: "Account has been added!",
            confirmText: "Ok",
          }}).afterClosed()),
        mergeMap(() => this.router.navigate(["/animals"])),
        catchError(() => this.matDialog.open(InfoDialogComponent, {data: {
            title: "Pet Portal",
            message: "An error has occurred please try again or contact administration",
            confirmText: "Ok",
          }}).afterClosed()),
        first()
      ));

  }

}
