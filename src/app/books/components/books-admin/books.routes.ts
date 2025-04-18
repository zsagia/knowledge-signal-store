import { Routes } from '@angular/router';

import { BooksAdminEditComponent } from '../books-admin-edit';
import { BooksAdminListComponent } from '../books-admin-list';
import { BooksAdminComponent } from './books-admin.component';

export const booksRoutes: Routes = [
  {
    path: '',
    component: BooksAdminComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      { path: 'list', component: BooksAdminListComponent },
      { path: 'edit', component: BooksAdminEditComponent },
    ],
  },
];
