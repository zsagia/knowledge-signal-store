import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin',
  imports: [RouterOutlet],
  templateUrl: './books-admin.component.html',
  styleUrl: './books-admin.component.scss',
})
export class BooksAdminComponent {}
