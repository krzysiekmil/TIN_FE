import {Component, OnInit} from '@angular/core';
import {
  BehaviorSubject,
  combineLatest,
  combineLatestWith, debounceTime,
  EMPTY,
  mergeAll,
  Observable,
  of,
  startWith,
  switchMap, withLatestFrom
} from "rxjs";
import {Page} from "../../core/model/page";
import {Event} from "../../core/model/event";
import {HttpClient} from "@angular/common/http";
import {EventService} from "../event.service";
import {PageEvent} from "@angular/material/paginator";
import {FormBuilder, FormGroup} from "@angular/forms";
import {merge} from "rxjs/internal/operators/merge";
import {tap} from "rxjs/operators";

@Component({
  selector: 'tin-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.scss']
})
export class EventListComponent implements OnInit{
  fetchData: boolean = false;
  event$: Observable<Page<Event>> = EMPTY
  form!: FormGroup
  pageNo = new BehaviorSubject<number>(0) ;

  constructor(private eventService: EventService, private formBuilder: FormBuilder) {
  }
  public ngOnInit(): void {
    this.initForm();
    combineLatest([this.pageNo.asObservable(), this.form.valueChanges])
    this.event$ = combineLatest([this.pageNo.asObservable(), this.form.valueChanges.pipe(startWith({}))])
      .pipe(
        tap(() => this.fetchData = true),
        debounceTime(500),
        switchMap(([pageNo, form], ) => this.eventService.getList(Number(pageNo), form.title ,form.startDateTime, form.endDateTime)),
        tap(() => this.fetchData = false),
  )






  }

  private initForm(): void {
    this.form = this.formBuilder.group({
      title: [],
      startDateTime: [],
      endDateTime: [],
      pageNo: []
    })
  }

  public handlePageEvent(event: PageEvent) {
    this.pageNo.next(event.pageIndex);
  }

  submit(): void {
    this.pageNo.next(this.pageNo.value);
  }
}
