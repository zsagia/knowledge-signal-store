import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  type,
  withHooks,
  withMethods,
  withProps,
} from '@ngrx/signals';
import {
  entityConfig,
  setAllEntities,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, pipe, switchMap } from 'rxjs';

import { Book } from '../models';
import { BookDataService } from '../services';

const booksStoreConfig = entityConfig({
  entity: type<Book>(),
  selectId: (book) => book.uid,
});

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withEntities<Book>(booksStoreConfig),
  withProps(() => ({
    bookDataService: inject(BookDataService),
  })),
  withMethods(({ bookDataService, ...store }) => ({
    listBooks: rxMethod<void>(
      pipe(
        debounceTime(3000),
        switchMap(() => {
          return bookDataService.listBooks().pipe(
            tapResponse({
              next: (books) =>
                patchState(store, setAllEntities(books, booksStoreConfig)),
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit() {
      console.log('BooksStore initialized');
    },
  })
);
