import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AnimalsDto, AnimalsService} from "../animals.service";

@Component({
  selector: 'tin-animals-list',
  templateUrl: './animals-list.component.html',
  styleUrls: ['./animals-list.component.scss']
})
export class AnimalsListComponent implements OnInit{
  public animalsList$: Observable<AnimalsDto[]> = of()

  constructor(private animalsService: AnimalsService) {
  }
  ngOnInit(): void {
    this.initAnimals()
  }

  private initAnimals(): void {
    this.animalsList$ = this.animalsService.getList()
  }



}
