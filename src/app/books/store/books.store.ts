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

import { debounceTime, pipe, switchMap, tap } from 'rxjs';

import { Book } from '../models';
import { BookDataService } from '../services';

const booksStoreConfig = entityConfig({
  entity: type<Book>(),
  selectId: (book) => book.uid,
});

export type Sort = {
    field: string;
    order: number;
}

export type CustomEntityState = {
  isLoading: boolean;
  newEntityButtonEnabled: boolean;
  selectedBook: Book | null;
  sort: Sort | null;
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

export function setSort(sort: Sort): Partial<CustomEntityState> {
    return { sort };
  }


export function withCustomEntity() {
  return signalStoreFeature(
    withState<CustomEntityState>({
      isLoading: false,
      newEntityButtonEnabled: false,
      selectedBook: null,
      sort: null
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
        setSort(sort: Sort): void {
            console.log('sort: ', sort);
            patchState(store, setSort(sort))
        }
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
    updateSort(): void {},
    listBooks: rxMethod<void>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(3000),
        switchMap(() => {
          return _bookDataService.listBooks().pipe(
            tapResponse({
              next: (books) => {
                patchState(store, setAllEntities(books, booksStoreConfig)),
                  patchState(store, { isLoading: false });
              },
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
    onInit() {
      console.log('BooksStore initialized');
    },
  })
);
