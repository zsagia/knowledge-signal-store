import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

import { Book } from '../../models';
import { TableModule } from 'primeng/table';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-book-table',
  imports: [TableModule],
  templateUrl: './book-table.component.html',
  styleUrl: './book-table.component.scss',
})
export class BookTableComponent {
  public books = signal<Book[]>([
    { uid: '1a', name: 'Winnetou', author: 'Karl May' },
  ]);
}
