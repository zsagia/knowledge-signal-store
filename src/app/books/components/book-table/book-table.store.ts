import { signalStore, withState } from '@ngrx/signals';

import { Book, books } from '../../models';

type BookTableState = {
  books: Book[];
  isLoading: boolean;
};

const initialState: BookTableState = {
  books: books,
  isLoading: false,
};

export const BookTableStore = signalStore(withState(initialState));
