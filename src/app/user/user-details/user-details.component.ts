import {Component, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  combineLatestWith,
  concatMap,
  EMPTY,
  filter,
  firstValueFrom, mergeMap,
  Observable,
  switchMap
} from "rxjs";
import {AnimalsDto, AnimalsService} from "../../animals/animals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {UserDto} from "../../core/model/user.model";
import {UserService} from "../../core/service/user.service";
import {PostService} from "../../post/post.service";
import {Post} from "../../core/model/post";
import {Page} from "../../core/model/page";
import {map, take, tap} from "rxjs/operators";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";

@Component({
  selector: 'tin-user-details',
  templateUrl: './user-details.component.html',
  styleUrls: ['./user-details.component.scss']
})
export class UserDetailsComponent implements OnInit{
  public user$: Observable<UserDto> = EMPTY
  public post$: Observable<Page<Post>> = EMPTY
  private id: string | null = null;
  private fetch = new BehaviorSubject(null);


  constructor(private userService:UserService, private postService: PostService, private snackBar: MatSnackBar,
              private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.initValue();
    this.initData();
  }

  private initValue(): void {

    if(!this.route.snapshot.paramMap.has("id")){
      this.router.navigate(['feed']);
    }

    this.id = this.route.snapshot.paramMap.get("id")
  }

  private initData() {
    this.user$ = this.fetch.pipe(switchMap(() => this.userService.getOne(this.id as unknown as number)))
    this.post$ = this.postService.getList(this.id as string)
  }

  public addToFriend():void {
    this.userService.inviteToFriends(this.id as unknown as number)
      .pipe(
        concatMap(() => this.snackBar.open("User has been invited from friends", "OK", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        map(()=> this.fetch.next(null)),
        take(1)
      )
      .subscribe()
  }

  public acceptInvitationToFriends():void {
    this.userService.acceptInvitationToFriends(this.id as unknown as number)
      .pipe(
        map(()=> this.fetch.next(null)),
        concatMap(() => this.snackBar.open("Invitation has been accepted", "OK", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        take(1)
      )
      .subscribe()
  }

  public rejectInvitationToFriends():void {
    this.userService.rejectInvitationToFriends(this.id as unknown as number)
      .pipe(
        map(()=> this.fetch.next(null)),
        concatMap(() => this.snackBar.open("Invitation has been rejected", "OK", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        take(1)
      )
      .subscribe()
  }

  public removeFromFriend():void {
    this.userService.removeFromFriends(this.id as unknown as number)
      .pipe(
        concatMap(() => this.snackBar.open("User has been removed from friends", "Ok", {horizontalPosition: "end", verticalPosition: "top"}).afterOpened()),
        map(()=> this.fetch.next(null)),
        take(1)
      )
      .subscribe()
  }

  public deleteUser(id: number):void {
    firstValueFrom(this.matDialog.open(ConfirmDialogComponent, {data: {
        title: "Pet Portal",
        message: "Are you sure to remove user?",
        confirmText: "Yes",
        cancelText: "No"
      }})
      .afterClosed()
      .pipe(
        filter(data => data === true),
        mergeMap(() => this.userService.delete(this.id as unknown as number)),
        mergeMap(() => this.router.navigate(["/admin/users"]))
      ))
  }
}
