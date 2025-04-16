import { computed, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  patchState,
  signalStore,
  signalStoreFeature,
  type,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
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

export type CustomEntityState = {
  isLoading: boolean;
  newEntityButtonEnabled: boolean;
  selectedBook: Book | null;
};

export function setNewEntityButtonEnabled(
  newEntityButtonEnabled: boolean
): Partial<CustomEntityState> {
  return { newEntityButtonEnabled };
}

export function setSelectedBook(
  selectedBook: Book | null
): Partial<CustomEntityState> {
  return { selectedBook };
}

export function setLoading(isLoading: boolean): Partial<CustomEntityState> {
  return { isLoading };
}

export function withCustomEntity() {
  return signalStoreFeature(
    withState<CustomEntityState>({
      isLoading: false,
      newEntityButtonEnabled: false,
      selectedBook: null,
    }),
    withComputed(({ newEntityButtonEnabled }) => ({
      isNewEntityButtonEnabled: computed(() => newEntityButtonEnabled()),
    })),
    withMethods((store) => {
      return {
        setNewEntityButtonEnabled(enabled: boolean): void {
          patchState(store, setNewEntityButtonEnabled(enabled));
        },
        setSelectedBook(selectedBook: Book | null): void {
          patchState(store, setSelectedBook(selectedBook));
        },
        setLoading(isLoading: boolean): void {
          patchState(store, setLoading(isLoading));
        },
      };
    })
  );
}

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withEntities<Book>(booksStoreConfig),
  withCustomEntity(),
  withProps(() => ({
    _bookDataService: inject(BookDataService),
  })),
  withMethods(({ _bookDataService, ...store }) => ({
    listBooks: rxMethod<void>(
      pipe(
        debounceTime(3000),
        switchMap(() => {
          return _bookDataService.listBooks().pipe(
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
