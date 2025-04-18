import { Component } from '@angular/core';

import { BookTableComponent } from '../book-table';

@Component({
  selector: 'app-books-admin',
  imports: [BookTableComponent],
  templateUrl: './books-admin.component.html',
  styleUrl: './books-admin.component.scss',
})
export class BooksAdminComponent {}
