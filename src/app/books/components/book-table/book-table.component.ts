import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';

import { BookTableStore } from './book-table.store';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [ButtonModule, TableModule],
  providers: [BookTableStore],
  templateUrl: './book-table.component.html',
  selector: 'app-book-table',
  styleUrl: './book-table.component.scss',
})
export class BookTableComponent {
  public bookTableStore = inject(BookTableStore);
}
