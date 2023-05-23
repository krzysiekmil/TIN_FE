import {Component, Input} from '@angular/core';
import {Post} from "../../core/model/post";

@Component({
  selector: 'tin-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.scss']
})
export class PostCardComponent {

  @Input() post!: Post

}
