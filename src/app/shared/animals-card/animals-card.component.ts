import {Component, Input} from '@angular/core';
import {AnimalsDto} from "../../animals/animals.service";

@Component({
  selector: 'tin-animals-card',
  templateUrl: './animals-card.component.html',
  styleUrls: ['./animals-card.component.scss']
})
export class AnimalsCardComponent {
  @Input() animal!: AnimalsDto
}
