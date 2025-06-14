import { computed, effect, inject } from '@angular/core';
import { tapResponse } from '@ngrx/operators';
import {
  getState,
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
  addEntity,
  entityConfig,
  setAllEntities,
  updateEntity,
  withEntities,
} from '@ngrx/signals/entities';
import { rxMethod } from '@ngrx/signals/rxjs-interop';

import { debounceTime, pipe, switchMap, tap } from 'rxjs';

import { Book } from '../models';
import { BookData } from '../services';
import { BooksResource } from '../resource';

const booksStoreConfig = entityConfig({
  entity: type<Book>(),
  selectId: (book) => book.id,
});

export type Sort = {
  field: string;
  order: number;
};

export type Page = {
  first?: number;
  rows?: number;
};

export type CustomEntityState = {
  isLoading: boolean;
  newEntityButtonEnabled: boolean;
  selectedBook: Book | null;
  sort: Sort;
  page: Page;
  count: number;
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

export function setPage(page: Page): Partial<CustomEntityState> {
  return { page };
}

export function setCount(count: number): Partial<CustomEntityState> {
  return { count };
}

export function withCustomEntity() {
  return signalStoreFeature(
    withState<CustomEntityState>({
      isLoading: false,
      newEntityButtonEnabled: false,
      page: { first: 0, rows: 2 },
      selectedBook: null,
      sort: { field: 'name', order: 1 },
      count: 0,
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
          patchState(store, setSort(sort));
        },
        setPage(page: Page): void {
          console.log('page: ', page);
          patchState(store, setPage(page));
        },
        setCount(count: number): void {
          patchState(store, setCount(count));
        },
      };
    })
  );
}

export const BooksStore = signalStore(
  { providedIn: 'root' },
  withEntities<Book>(booksStoreConfig),
  withCustomEntity(),
  withProps((store) => ({
    _bookDataService: inject(BookData),
    _booksResource: inject(BooksResource),
  })),
  withProps((store) => ({
    _booksResource: store._booksResource.booksResource(
      store.sort,
      store.page
    ),
  })),
  withMethods(({ _bookDataService, ...store }) => ({
    updateSort(): void {},
    createBook: rxMethod<Book>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(3000),
        switchMap((book) => {
          return _bookDataService.createBook(book).pipe(
            tapResponse({
              next: (book) => {
                patchState(store, addEntity(book));
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
    getBooksCount: rxMethod<void>(
      pipe(
        switchMap(() => {
          return _bookDataService.getLength().pipe(
            tapResponse({
              next: (count) => {
                patchState(store, setCount(count));
              },
              error: (err) => {
                console.error(err);
              },
            })
          );
        })
      )
    ),
    listBooks: () => {
      const resource = store._booksResource;

      effect(() => {
        const value = resource.value();

        patchState(store, setAllEntities(value || [], booksStoreConfig));
      })
    },
    reloadBooks: () => {
      store._booksResource.reload();
    },
    updateBook: rxMethod<Book>(
      pipe(
        tap(() => patchState(store, { isLoading: true })),
        debounceTime(1000),
        switchMap((book) => {
          return _bookDataService.updateBook(book).pipe(
            tapResponse({
              next: (book) => {
                patchState(store, updateEntity({ id: book.id, changes: book }));
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
    onInit(store) {
      effect(() => {
        const state = getState(store);
        console.log('books state', state);
      });
      store.getBooksCount();
    },
    onDestroy() {
      console.log('BookTableStore is destroyed');
    },
  })
);
