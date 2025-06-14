import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';

import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BookFormStore } from './book-form.store';
import { ButtonModule } from 'primeng/button';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-book-form',
  providers: [BookFormStore],
  imports: [
    ButtonModule,
    FormsModule,
    ReactiveFormsModule,
    FloatLabelModule,
    InputTextModule,
  ],
  templateUrl: './book-form.html',
  styleUrl: './book-form.scss',
})
export class BookForm {
  public bookFormStore = inject(BookFormStore);
}
