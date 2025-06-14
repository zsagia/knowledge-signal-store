import { inject, Injectable, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookData, BookUtil } from '../services';
import { Page, Sort } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BooksResource {
  bookData = inject(BookData);
  bookUtil = inject(BookUtil);

  booksResource = (sort: Signal<Sort>, page: Signal<Page>) =>
    rxResource({
      params: () => ({ sort: sort(), page: page() }),
      stream: (loaderParams) => {
        const page = loaderParams.params.page;
        const sort = loaderParams.params.sort;
        const queryParams = this.bookUtil.createQueryParams(sort, page);

        return this.bookData.listBooks(queryParams);
      },
    });
}
