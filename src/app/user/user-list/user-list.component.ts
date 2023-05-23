import {Component, OnInit} from '@angular/core';
import {PageEvent} from "@angular/material/paginator";
import {
  BehaviorSubject, combineLatest,
  combineLatestAll,
  combineLatestWith,
  concatMap, debounceTime,
  EMPTY, exhaustMap, iif,
  Observable, startWith,
  Subject,
  switchMap, withLatestFrom
} from "rxjs";
import {Page} from "../../core/model/page";
import {Event} from "../../core/model/event";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../core/model/user.model";
import {UserService} from "../../core/service/user.service";
import {map, take, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {UserInvitations} from "../../core/model/user-invitations";



@Component({
  selector: 'tin-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent implements OnInit{
  public fetchData: boolean = false;
  public friends$: Observable<UserDto[]> = EMPTY;
  public invitations$: Observable<UserInvitations[]> = EMPTY;
  public pageNo = new BehaviorSubject<number>(0);
  public form!: FormGroup;

  private fetchInvitations = new BehaviorSubject(null);
  private fetch = new BehaviorSubject<boolean>(true);

  constructor(private userService: UserService, private snackBar: MatSnackBar, private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.initForm();
    this.initData();
  }

  private initForm() {
    this.form = this.formBuilder.group({
      query: [null]
    })
  }

  private initData() {
    this.friends$ =  this.fetch.pipe(
      combineLatestWith(this.form.valueChanges.pipe(startWith({}), debounceTime(500))),
          tap( (data) => console.log(data)),
          switchMap(([fetch, form]) =>  !form.query? this.userService.getFriendsList(): this.userService.getList(form)));
    this.invitations$ = this.fetchInvitations.pipe(switchMap(() => this.userService.getInvitations()))
  }

  public acceptInvitationToFriends(id: number):void {
    this.userService.acceptInvitationToFriends(id)
      .pipe(
        tap(() => this.form.patchValue({})),
        map(()=> this.fetch.next(true)),
        map(()=> this.fetchInvitations.next(null)),
        concatMap(() => this.snackBar.open("Invitation has been accepted", "OK", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        take(1)
      )
      .subscribe()
  }

  public rejectInvitationToFriends(id: number):void {
    this.userService.rejectInvitationToFriends(id)
      .pipe(
        tap(() => this.form.patchValue({})),
        map(()=> this.fetch.next(true)),
        map(()=> this.fetchInvitations.next(null)),
        concatMap(() => this.snackBar.open("Invitation has been rejected", "OK", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        take(1)
      )
      .subscribe()
  }


}
