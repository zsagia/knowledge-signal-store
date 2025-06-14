import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookForm } from "../book-form/book-form";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin-edit',
  imports: [BookForm],
  templateUrl: './books-admin-edit.html',
  styleUrl: './books-admin-edit.scss'
})
export class BooksAdminEdit {

}
