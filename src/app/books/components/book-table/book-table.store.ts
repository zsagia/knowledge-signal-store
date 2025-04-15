import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, pipe, switchMap, tap } from 'rxjs';

import { Book } from '../../models';
import { BookDataService } from '../../services';

type BookTableState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BookTableState = {
  books: [],
  isLoading: false,
};

export const BookTableStore = signalStore(
  withState(initialState),
  withMethods((store, bookDataService = inject(BookDataService)) => ({
    listBooks: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(3000),
        switchMap(() => {
          return bookDataService.listBooks().pipe(
            tapResponse({
              next: (books) => patchState(store, { books, isLoading: false }),
              error: (err) => {
                patchState(store, { isLoading: false });
                console.error(err);
              },
            })
          );
        })
      )
    ),
  })),
  withHooks({
    onInit(store) {
      store.listBooks();
    },
    onDestroy() {
      console.log('BookTableStore is destroyed');
    },
  })
);
