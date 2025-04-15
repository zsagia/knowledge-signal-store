import { Component } from '@angular/core';

import { BookTableComponent } from '../../books/components/book-table';

@Component({
  selector: 'app-books-page',
  imports: [BookTableComponent],
  templateUrl: './books-page.component.html',
  styleUrl: './books-page.component.scss',
})
export class BooksPageComponent {}
