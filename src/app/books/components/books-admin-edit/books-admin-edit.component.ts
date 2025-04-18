import { ChangeDetectionStrategy, Component } from '@angular/core';
import { BookFormComponent } from "../book-form/book-form.component";

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-books-admin-edit',
  imports: [BookFormComponent],
  templateUrl: './books-admin-edit.component.html',
  styleUrl: './books-admin-edit.component.scss'
})
export class BooksAdminEditComponent {

}
