import { Component, EventEmitter, Input, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UntypedFormBuilder } from '@angular/forms';

@Component({
  selector: 'app-pagination',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pagination.component.html',
  styleUrl: './pagination.component.css',
})
export class PaginationComponent {
  @Output() onPageChange = new EventEmitter();
  @Input() currentPage!: number;
  totalPages: number[] = new Array(4);

  constructor() {
    console.log(
      '🚀 ~ file: pagination.component.ts:13 ~ PaginationComponent ~ currentPage:',
      this.currentPage
    );
  }
  handleClick(ev: Event, page: number) {
    ev.preventDefault();
    this.onPageChange.emit(page);
  }
}
