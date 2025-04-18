import { Routes } from '@angular/router';

import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
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
