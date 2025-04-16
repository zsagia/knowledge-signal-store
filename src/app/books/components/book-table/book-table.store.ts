import { computed, inject } from '@angular/core';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';
import { BooksStore } from '../../store/books.store';

type BookTableState = {
  isLoading: boolean;
};

const initialState: BookTableState = {
  isLoading: false,
};

export const BookTableStore = signalStore(
  withState(initialState),
  withProps(() => ({
    booksStore: inject(BooksStore),
  })),
  withComputed(({ booksStore }) => ({
    books: computed(() => booksStore.entities()),
  })),
  withHooks({
    onInit(store) {
      store.booksStore.listBooks();
    },
    onDestroy() {
      console.log('BookTableStore is destroyed');
    },
  })
);
