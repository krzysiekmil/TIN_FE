import {Component, OnInit} from '@angular/core';
import {Observable, of} from "rxjs";
import {AnimalsDto, AnimalsService} from "../../animals/animals.service";

@Component({
  selector: 'tin-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit{
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
