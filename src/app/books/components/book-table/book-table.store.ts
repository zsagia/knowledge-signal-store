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
import { BooksStore, Page, Sort } from '../../store/books.store';
import { BookUtil } from '../../services';

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
    _bookUtilService: inject(BookUtil),
    router: inject(Router),
    activatedRoute: inject(ActivatedRoute),
  })),
  withMethods((store) => ({
    createBookActionHandler() {
      store.router.navigate(['../edit'], { relativeTo: store.activatedRoute });
    },
    editActionHandler(book: Book) {
      store.booksStore.setSelectedBook(book);
      store.router.navigate(['../edit'], { relativeTo: store.activatedRoute });
    },
    onPageChange(page: Page) {
      store.booksStore.setPage(page);
    },
    onSortChange(sort: Sort) {
      const _sort = store.booksStore.sort();

      if (sort.field !== _sort?.field || sort.order !== _sort?.order) {
        store.booksStore.setSort(sort);
      }
    },
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
