import { inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, distinctUntilChanged, pipe, switchMap, tap } from 'rxjs';

import { Book, books } from '../../models';
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
        debounceTime(3000),
        tap(() => patchState(store, { isLoading: true })),
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
  }))
);
