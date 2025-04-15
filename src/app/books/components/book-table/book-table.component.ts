import { TableModule } from 'primeng/table';

import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';

import { Book, books } from '../../models';
import { BookTableStore } from './book-table.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TableModule],
  providers: [BookTableStore],
  templateUrl: './book-table.component.html',
  selector: 'app-book-table',
  styleUrl: './book-table.component.scss',
})
export class BookTableComponent {
  bookTableStore = inject(BookTableStore);
}
