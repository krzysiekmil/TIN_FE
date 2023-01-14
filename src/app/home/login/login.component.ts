import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../core/service/auth.service";
import {first, take} from "rxjs/operators";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'tin-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  public form!: FormGroup;
  public hide = true;
  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router, private snackbar: MatSnackBar) {
  }
  public ngOnInit(): void {
    this.form = this.fb.group({
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.min(8)]],
    })
  }

  public submit(): void {

    this.authService.login(this.form.value)
      .toPromise()
      .then(() => this.router.navigate(['animals']))
      .catch((e) => {
        console.log(e)
        this.snackbar.open("Wrong credential :(", "OK", {
          duration: 3000
        })
      })
  }
}
