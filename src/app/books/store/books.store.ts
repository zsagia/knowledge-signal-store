import { signalStore, withHooks, withMethods, withProps } from '@ngrx/signals';
import { withEntities } from '@ngrx/signals/entities';

import { Book } from '../models';
import { inject } from '@angular/core';
import { BookDataService } from '../services';

export const BooksStore = signalStore(
  withEntities<Book>(),
  withProps(() => ({
    bookDataService: inject(BookDataService),
  })),
  withMethods(({ bookDataService, ...store }) => ({})),
  withHooks({
    onInit() {
      console.log('BooksStore initialized');
    },
  })
);
