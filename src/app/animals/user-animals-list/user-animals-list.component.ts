import {Component, OnInit} from '@angular/core';
import {empty, Observable, of} from "rxjs";
import {AnimalsDto, AnimalsService} from "../animals.service";

@Component({
  selector: 'tin-user-animals-list',
  templateUrl: './user-animals-list.component.html',
  styleUrls: ['./user-animals-list.component.scss']
})
export class UserAnimalsListComponent implements OnInit{

  public animalsList$: Observable<AnimalsDto[]> = empty()

  constructor(private animalsService: AnimalsService) {
  }
  public ngOnInit(): void {
    this.initAnimals()
  }

  private initAnimals(): void {
    this.animalsList$ = this.animalsService.getUserList()
  }
}
