import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {ActivatedRoute} from "@angular/router";
import {MatChipInputEvent} from "@angular/material/chips";
import {firstValueFrom} from "rxjs";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";

@Component({
  selector: 'tin-user-admin-details',
  templateUrl: './user-admin-details.component.html',
  styleUrls: ['./user-admin-details.component.scss']
})
export class UserAdminDetailsComponent implements OnInit {

  id!: number;
  form!: FormGroup;
  roles: any[] = []

  constructor(private userService: UserService, private activatedRoute: ActivatedRoute, private formBuilder: FormBuilder, private matDialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.id = Number(this.activatedRoute.snapshot.paramMap.get("id"));
    this.form = this.formBuilder.group({
      id: [{value: null, disabled: true}],
      firstName: [null],
      lastName: [null],
      dateOfBirth: [null],
      email: [null, Validators.email],
      roles: []
    });
    firstValueFrom(this.userService.getOne(this.id))
      .then(data => {
        this.form.patchValue(data)
        this.roles = data.roles || [];
      });

  }

  public onRolesRemoved(role: string) {
    const roles = this.form.get("roles")?.value as string[];
    this.removeFirst(roles, role);
    this.form.get("roles")?.setValue(roles);
  }

  private removeFirst(array: any[], toRemove: any): void {

    const index = array.indexOf(toRemove);
    if (index !== -1) {
      array.splice(index, 1);
    }
  }

  submit() {
    firstValueFrom(this.userService.update(this.id, this.form.value))
      .then(data => this.matDialog.open(InfoDialogComponent, {
        data: {
          title: 'Pet portal',
          message: 'The user has been updated'
        }
      }));
  }
}
