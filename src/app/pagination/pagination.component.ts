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
  @Input() totalPages!: number;

  pageNumber: number[] = new Array(10);

  constructor() {
    console.log(
      '🚀 ~ file: pagination.component.ts:18 ~ PaginationComponent ~ pageNumber:',
      this.pageNumber,
      this.totalPages
    );
  }
  handleClick(ev: Event, page: number) {
    ev.preventDefault();
    this.onPageChange.emit(page);
  }
}
