import {Component, EventEmitter, Input, Output} from '@angular/core';
import {UserDto} from "../../core/model/user.model";
import {UserInvitations} from "../../core/model/user-invitations";

@Component({
  selector: 'tin-user-card[user]',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.scss']
})
export class UserCardComponent {

  @Input() user!: UserDto | UserInvitations
  @Input() invitation: boolean = false
  @Output() acceptInvitation = new EventEmitter<void>();
  @Output() rejectInvitation = new EventEmitter<void>();


  public acceptInvitationToFriends():void {
    this.acceptInvitation.next()
  }

  public rejectInvitationToFriends(): void {
    this.acceptInvitation.next()
  }
}
