import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookTable } from '../book-table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin-list',
  imports: [BookTable],
  templateUrl: './books-admin-list.html',
  styleUrl: './books-admin-list.scss',
})
export class BooksAdminList {}
