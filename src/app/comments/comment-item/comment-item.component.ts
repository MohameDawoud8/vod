import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-comment-item',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './comment-item.component.html',
  styleUrl: './comment-item.component.css',
})
export class CommentItemComponent {
  @Input() comment: any = {};
}
