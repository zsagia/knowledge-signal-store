import { Routes } from '@angular/router';

import { BooksAdminEdit } from '../books-admin-edit';
import { BooksAdminList } from '../books-admin-list';
import { BooksAdmin } from './books-admin';

export const booksRoutes: Routes = [
  {
    path: '',
    component: BooksAdmin,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'list',
      },
      { path: 'list', component: BooksAdminList },
      { path: 'edit', component: BooksAdminEdit },
    ],
  },
];
