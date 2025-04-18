import { Routes } from '@angular/router';

import { BooksAdminComponent } from '../../books/components/books-admin';
import { AdminComponent } from './admin.component';

export const adminRoutes: Routes = [
  {
    path: '',
    component: AdminComponent,
    children: [{ path: 'books', component: BooksAdminComponent }],
  },
];
