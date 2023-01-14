import {Component, OnInit} from '@angular/core';
import {EMPTY, empty, filter, firstValueFrom, mergeMap, Observable, of} from "rxjs";
import {AnimalsDto, AnimalsService} from "../animals.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {ConfirmDialogComponent} from "../../shared/confirm-dialog/confirm-dialog.component";
import {tap} from "rxjs/operators";

@Component({
  selector: 'tin-animals-details',
  templateUrl: './animals-details.component.html',
  styleUrls: ['./animals-details.component.scss']
})
export class AnimalsDetailsComponent implements OnInit{

  public animal$: Observable<AnimalsDto> = EMPTY
  private id: string | null = null;


  constructor(private animalsService:AnimalsService, private router: Router, private route: ActivatedRoute, private matDialog: MatDialog) {}

  public ngOnInit(): void {
    this.initValue();
    this.initData();
  }

  private initValue(): void {
    this.id = this.route.snapshot.paramMap.get("id")
  }

  private initData(): void {
    this.animal$ = this.animalsService.getOne(this.id as unknown as number)
  }

  public openEdit(): void {
    this.router.navigate(['edit'], {relativeTo: this.route})
  }

  public openDelete(): void {
    firstValueFrom(this.matDialog.open(ConfirmDialogComponent, {data: {
      title: "Pet Portal",
        message: "Are you sure to remove animal?",
        confirmText: "Yes",
        cancelText: "No"
      }})
      .afterClosed()
      .pipe(
        tap(data => console.log(data)),
        filter(data => data === true),
        mergeMap(() => this.animalsService.delete(this.id as unknown as number)),
        mergeMap(() => this.router.navigate(["/animals/me"]))
      ))
  }
}
