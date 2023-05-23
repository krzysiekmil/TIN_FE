import {Component, Input} from '@angular/core';
import {Event} from "../../core/model/event";

@Component({
  selector: 'tin-event-card',
  templateUrl: './event-card.component.html',
  styleUrls: ['./event-card.component.scss']
})
export class EventCardComponent {

  @Input() event?: Event
}
