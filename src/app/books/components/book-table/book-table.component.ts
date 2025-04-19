import { ButtonModule } from 'primeng/button';
import { Paginator, PaginatorModule } from 'primeng/paginator';
import { Table, TableModule } from 'primeng/table';

import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewChild,
} from '@angular/core';

import { BookTableStore } from './book-table.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TableModule, PaginatorModule],
  providers: [BookTableStore],
  templateUrl: './book-table.component.html',
  selector: 'app-book-table',
  styleUrl: './book-table.component.scss',
})
export class BookTableComponent implements AfterViewInit {
  public bookTableStore = inject(BookTableStore);

  @ViewChild('table') table!: Table;
  @ViewChild('paginator') paginator!: Paginator;

  ngAfterViewInit(): void {
    const sort = this.bookTableStore.booksStore.sort();
    const page = this.bookTableStore.booksStore.page();

    setTimeout(() => {
      this.table.sortField = sort?.field;
      this.table.sortOrder = sort?.order || 1;

      this.paginator.first = page?.first || 0;
      this.paginator.rows = page?.rows || 2;
    });
  }
}
