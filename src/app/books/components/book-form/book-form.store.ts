import { computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import {
  patchState,
  signalStore,
  withComputed,
  withHooks,
  withMethods,
  withProps,
  withState,
} from '@ngrx/signals';

import { BooksStore } from '../../store/books.store';
import { BookData } from '../../services';

type BookFormState = {
  formGroup: FormGroup;
};

const initialState: BookFormState = {
  formGroup: new FormGroup([]),
};

export const BookFormStore = signalStore(
  withState(initialState),
  withProps(() => ({
    _activatedRoute: inject(ActivatedRoute),
    _booksStore: inject(BooksStore),
    _bookDataService: inject(BookData),
    _formBuilder: inject(FormBuilder),
    _router: inject(Router),
  })),
  withComputed(({ _booksStore }) => ({
    selectedBook: computed(() => _booksStore.selectedBook()),
  })),
  withMethods((store) => ({
    submit() {
      const formGroup = store.formGroup();

      if (store.selectedBook()) {
        store._booksStore.updateBook({ ...formGroup.value });
      } else {
        store._booksStore.createBook({ ...formGroup.value });
      }
      console.log(formGroup);
      store._router.navigate(['../'], { relativeTo: store._activatedRoute });
    },
    _createFormGroup() {
      const book = store.selectedBook();

      patchState(store, {
        formGroup: store._formBuilder.group({
          author: [
            book?.author,
            [Validators.required, Validators.minLength(3)],
          ],
          name: [book?.name, [Validators.required, Validators.minLength(3)]],
          id: [book?.id],
        }),
      });
    },
    cancel() {
      store._router.navigate(['../'], { relativeTo: store._activatedRoute });
    },
  })),

  withHooks({
    onInit(store) {
      store._createFormGroup();
    },
    onDestroy(store) {
      console.log('BookFormStore is destroyed');
      store._booksStore.setSelectedBook(null);
    },
  })
);
