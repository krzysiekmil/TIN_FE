import {Component, Input} from '@angular/core';
import {AnimalsDto} from "../../animals.service";

@Component({
  selector: 'tin-animals-details-card',
  templateUrl: './animals-details-card.component.html',
  styleUrls: ['./animals-details-card.component.scss']
})
export class AnimalsDetailsCardComponent {
  @Input() animal!: AnimalsDto
}
