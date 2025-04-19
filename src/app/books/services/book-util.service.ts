import { Injectable, inject } from '@angular/core';

import { BooksStore, Page, Sort } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BookUtilService {
  private store = inject(BooksStore);

  public createQueryParams(): string[] {
    return [
      this.createSortParam(this.store.sort()),
      ...this.createPageParams(this.store.page()),
    ];
  }

  private createPageParams(page: Page | null): string[] {
    return [`_start=${page?.first || 0}`, `_limit=${page?.rows || 2}`];
  }

  private createSortParam(sort: Sort | null): string {
    return sort ? `_sort=${sort.order === -1 ? '-' : ''}${sort.field}` : '';
  }
}
