import { Injectable } from '@angular/core';

import { Page, Sort } from '../store';

@Injectable({
  providedIn: 'root',
})
export class BookUtil {
  public createQueryParams(sort: Sort, page: Page): string[] {
    return [
      this.createSortParam(sort),
      ...this.createPageParams(page),
    ];
  }

  private createPageParams(page: Page | null): string[] {
    return [`_start=${page?.first || 0}`, `_limit=${page?.rows || 2}`];
  }

  private createSortParam(sort: Sort | null): string {
    return sort ? `_sort=${sort.order === -1 ? '-' : ''}${sort.field}` : '';
  }
}
