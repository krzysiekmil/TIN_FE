import {Component, OnInit, ViewChild} from '@angular/core';
import {ThemePalette} from "@angular/material/core";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../core/service/user.service";
import {EMPTY, firstValueFrom, mergeMap, Observable} from "rxjs";
import {UserDto} from "../../core/model/user.model";
import {ActivatedRoute, Router} from "@angular/router";
import {EventService} from "../event.service";
import {Event} from "../../core/model/event";
import {MatDialog} from "@angular/material/dialog";
import {InfoDialogComponent} from "../../shared/info-dialog/info-dialog.component";
import {map, take} from "rxjs/operators";
import * as moment from "moment";

@Component({
  selector: 'tin-event-form',
  templateUrl: './event-form.component.html',
  styleUrls: ['./event-form.component.scss']
})
export class EventFormComponent implements OnInit{
  @ViewChild('picker') picker: any;

  public date!: moment.Moment;
  public disabled = false;
  public showSpinners = true;
  public showSeconds = false;
  public touchUi = false;
  public enableMeridian = false;
  public minDate!: moment.Moment;
  public maxDate!: moment.Moment;
  public stepHour = 1;
  public stepMinute = 1;
  public stepSecond = 1;
  public color: ThemePalette = 'primary';

  public form!: FormGroup
  public friends$: Observable<UserDto[]> = EMPTY
  public id?: number;
  constructor(private formBuilder: FormBuilder, private userService: UserService, private route: ActivatedRoute,
              private eventService: EventService, private matDialog: MatDialog, private router: Router) {
  }
  ngOnInit(): void {
    this.initForm();
    this.initData();
    this.initFriends();
  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: [null, Validators.required],
      description: [null],
      startDateTime: [null, Validators.required],
      endDateTime: [null, Validators.required],
      members: [[]]
    })
  }

  private initData(): void {

    if(!this.route.snapshot.paramMap.has("id")){
      return;
    }

    this.id = Number(this.route.snapshot.paramMap.get("id"))

    firstValueFrom(this.eventService.getOne(this.id))
      .then((event) => {
        this.form.patchValue({...event, members: event.members.map(member => member.userId)})

      })
  }

  private initFriends(): void {
    this.friends$ = this.userService.getFriendsList();
  }

  public submit() {
    const observable = this.id ? this.eventService.update(this.id, this.form.getRawValue()) : this.eventService.create(this.form.getRawValue())

    observable
      .pipe(
        take(1),
        map(() => this.matDialog.open(InfoDialogComponent, {
          data: {
            title: 'Pet portal',
            message: 'The event has been saved'
          }
        })),
        mergeMap((dialog) => dialog.afterClosed()),
        mergeMap(() => this.router.navigate(["/event"])),
        take(1)
      )
      .subscribe();

  }
}
