import { ChangeDetectionStrategy, Component } from '@angular/core';

import { RouterOutlet } from '@angular/router';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin',
  imports: [RouterOutlet],
  templateUrl: './books-admin.html',
  styleUrl: './books-admin.scss',
})
export class BooksAdmin {}
