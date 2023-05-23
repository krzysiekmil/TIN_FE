import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../../core/service/user.service";
import {catchError, empty, EMPTY, merge, Observable, of, startWith, switchMap} from "rxjs";
import {UserDto} from "../../core/model/user.model";
import {MatSort} from "@angular/material/sort";
import {MatPaginator} from "@angular/material/paginator";
import {map, tap} from "rxjs/operators";
import {Page} from "../../core/model/page";
import {Router} from "@angular/router";

@Component({
  selector: 'tin-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit {

  displayedColumns: string[] = ['id', 'username', 'firstName', 'lastName', 'email', 'dateOfBirth'];

  resultsLength = 0;
  isLoadingResults = true;
  isRateLimitReached = false;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  data: UserDto[] = [];
  userList$: Observable<UserDto[]> = EMPTY;

  constructor(private userService: UserService, private router: Router) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.initData();
  }

  private initData(): void {
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        startWith({}),
        tap(() => this.isLoadingResults = true),
        switchMap(() => this.userService.getPagingList()),
        catchError(() => of(null)),
        map((data) => this.handleData(data)),
      )
      .subscribe((data: UserDto[]) => (this.data = data));
  }

  private handleData(data: Page<UserDto> | null): UserDto[] {
    this.isLoadingResults = false;
    this.isRateLimitReached = data === null;

    if (!data) {
      return [];
    }

    this.resultsLength = data.totalElements;
    return data.content;
  }

  public openUserDetail(id: number){
    this.router.navigate(["user",id]);
  }

}
