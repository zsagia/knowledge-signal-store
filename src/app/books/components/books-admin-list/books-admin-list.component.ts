import { ChangeDetectionStrategy, Component } from '@angular/core';

import { BookTableComponent } from '../book-table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin-list',
  imports: [BookTableComponent],
  templateUrl: './books-admin-list.component.html',
  styleUrl: './books-admin-list.component.scss',
})
export class BooksAdminListComponent {}
