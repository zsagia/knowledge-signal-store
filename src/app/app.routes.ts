import { Routes } from '@angular/router';

import { BooksPageComponent } from './pages/books-page';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'books',
  },
  {
    path: 'books',
    component: BooksPageComponent,
  },
];
