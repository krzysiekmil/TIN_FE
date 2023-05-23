import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import {FeedService} from "../feed.service";
import {BehaviorSubject, EMPTY, exhaustMap, Observable,} from "rxjs";
import {Feed} from "../../core/model/feed";
import {CdkVirtualScrollViewport} from "@angular/cdk/scrolling";
import {tap} from "rxjs/operators";

@Component({
  selector: 'tin-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.scss']
})
export class FeedListComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, { static: false }) virtualScroll!: CdkVirtualScrollViewport;

  index = 1;
  feed$: Observable<Feed[]> = EMPTY;
  feeds: Feed[] = [];
  loading: boolean = true;
  fetch: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  totalEnd: boolean = false;

  constructor(private feedService: FeedService, private changeDetRef: ChangeDetectorRef) {}

  public ngOnInit(): void {
    this.feed$ = this.fetch.pipe(
      exhaustMap((offset) => this.feedService.getList(offset)),
      tap((data: Feed[]) => this.totalEnd = data.length == 0),
      tap((data: Feed[]) => this.feeds = [...this.feeds, ...data]),
      tap(() => this.loading = false)
    )

  }

  public nextBatch() {

    if (this.totalEnd) {
      return;
    }

    const end = this.virtualScroll.getRenderedRange().end;
    const total = this.virtualScroll.getDataLength()

    if (end === total) {
      this.fetch?.next(total)

    }
  }

  public refresh(): void {
    this.loading = true;
    this.feeds = [];
    this.fetch.next(0);
    this.changeDetRef.detectChanges();
  }
}
