import {Component, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  EMPTY,
  exhaustMap,
  filter,
  firstValueFrom,
  mergeMap,
  Observable,
  startWith,
  switchMap
} from "rxjs";
import {Event} from "../../core/model/event";
import {EventService} from "../event.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {map, tap} from "rxjs/operators";
import {EventMembersListComponent} from "../event-members-list/event-members-list.component";
import {MatChipEvent, MatChipListboxChange} from "@angular/material/chips";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'tin-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.scss']
})
export class EventDetailsComponent implements OnInit{
  event$: Observable<Event> = EMPTY
  id!: number
  eventMemberStatus?: string;
  fetch = new BehaviorSubject(null);
  constructor(private eventService: EventService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog, private authService: AuthService) {}

  public ngOnInit(): void {
    this.initValue();
    this.initData();
  }


  private initData(): void {
    this.event$ = this.fetch.asObservable().pipe(
      startWith(),
      switchMap(() => this.eventService.getOne(this.id)),
      tap((event: Event) => this.eventMemberStatus = event.members.find(user => user.userId == this.authService.user.id)?.attendingStatus));
  }

  private initValue(): void {
    this.id = Number(this.route.snapshot.paramMap.get("id"))
  }

  public delete(): void {
    firstValueFrom(this.matDialog.open(ConfirmDialogComponent, {data: {
        title: "Pet Portal",
        message: "Are you sure to remove event?",
        confirmText: "Yes",
        cancelText: "No"
      }})
      .afterClosed()
      .pipe(
        filter(data => data === true),
        exhaustMap(() => this.eventService.delete(this.id)),
        exhaustMap(() => this.router.navigate(["/event"]))
      ));
  }

  public showEventMemberList(){
    this.matDialog.open(EventMembersListComponent)
  }

  public changeEventMemberStatus(change: MatChipListboxChange){
    firstValueFrom(this.eventService.changeEventMemberStatus(this.id, {status: change.value}))
      .then(() => this.fetch.next(null))
  }
}
