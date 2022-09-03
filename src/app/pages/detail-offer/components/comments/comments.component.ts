import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from 'src/app/shared/model/comment.model';
import { CommentService } from 'src/app/shared/services/comment.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {

  @Input()
  offerID!: number;

  comments$: Observable<Comment[]>;

  constructor(
    private commentService: CommentService
  ) {
    this.comments$ = this.commentService.getCommentsByOfferID(this.offerID);
  }

}
