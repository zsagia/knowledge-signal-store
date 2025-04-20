import { inject, Injectable, Signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { BookDataService, BookUtilService } from '../services';
import { Page, Sort } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BooksResourceService {
  bookDataService = inject(BookDataService);
  bookUtilService = inject(BookUtilService);

  booksResource = (sort: Signal<Sort>, page: Signal<Page>) =>
    rxResource({
      request: () => ({ sort: sort(), page: page() }),
      loader: (params) => {
        const page = params.request.page;
        const sort = params.request.sort;
        const queryParams = this.bookUtilService.createQueryParams(sort, page);

        return this.bookDataService.listBooks(queryParams);
      },
    });
}
