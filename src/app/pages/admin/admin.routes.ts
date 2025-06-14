import { Routes } from '@angular/router';

import { Admin } from './admin';

export const adminRoutes: Routes = [
  {
    path: '',
    component: Admin,
    children: [
      {
        path: 'books',
        loadChildren: () =>
          import('../../books/components/books-admin/books.routes').then(
            (m) => m.booksRoutes
          ),
      },
    ],
  },
];
