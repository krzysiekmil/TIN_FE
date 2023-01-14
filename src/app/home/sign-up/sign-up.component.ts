import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'tin-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit{
  public form!: FormGroup;
  public hide = true;
  constructor(private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.form = this.fb.group({
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      username: [null, Validators.required],
      password: [null, [Validators.required, Validators.min(8)]],
      birthDate: [null, Validators.required],
      rules: [null, Validators.requiredTrue]
    })
  }

}
