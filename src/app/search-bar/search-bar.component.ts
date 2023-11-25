import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';
import { UserService } from '../services/user.service';
import { User } from '../model/user.modal';

@Component({
  selector: 'app-search-bar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  providers: [UserService],
})
export class SearchBarComponent {
  @Output() onSearchTermChange = new EventEmitter();

  searchTerm: string = '';
  users: any = [];

  constructor(private service: UserService) {}

  filteredUsers(searchTerm: string, rescourse = this.users) {
    if (searchTerm) {
      return rescourse.filter((user: User) => user.id === Number(searchTerm));
    }
  }

  handleSearchChange(term: any) {
    this.searchTerm = term;
  }

  onSubmit(f: NgForm) {
    const user = this.users.filter(
      (user: User) => user.name === f.controls['searchTerm']?.value
    );
    console.log(
      '🚀 ~ file: search-bar.component.ts:37 ~ SearchBarComponent ~ onSubmit ~ user:',
      user
    );

    this.onSearchTermChange.emit(user);
  }

  ngOnInit() {
    this.service.getAll().subscribe((users) => {
      this.users = users;
    });
  }
}
