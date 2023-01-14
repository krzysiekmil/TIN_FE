import {Component, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'tin-animals-details-management',
  templateUrl: './animals-details-management.component.html',
  styleUrls: ['./animals-details-management.component.scss']
})
export class AnimalsDetailsManagementComponent {
  @Output() edit: EventEmitter<void> = new EventEmitter<void>();
  @Output() delete: EventEmitter<void> = new EventEmitter<void>();


}
