import { computed, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { Book } from '../../models';
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
    router: inject(Router),
    activatedRoute: inject(ActivatedRoute)
  })),
  withMethods((store) => ({
    createBookActionHandler(){
      store.router.navigate(['../edit'], { relativeTo: store.activatedRoute});
    },
    editActionHandler(book: Book) {
      console.log('navigate');
      store.booksStore.setSelectedBook(book);
      store.router.navigate(['../edit'], { relativeTo: store.activatedRoute});
    },
  })),
  withComputed(({ booksStore }) => ({
    books: computed(() => booksStore.entities()),
  })),
  withHooks({
    onDestroy() {
      console.log('BookTableStore is destroyed');
    },
  })
);
