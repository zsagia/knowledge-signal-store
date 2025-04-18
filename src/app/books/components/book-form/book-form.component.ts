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
  templateUrl: './book-form.component.html',
  styleUrl: './book-form.component.scss',
})
export class BookFormComponent {
  public bookFormStore = inject(BookFormStore);
}
