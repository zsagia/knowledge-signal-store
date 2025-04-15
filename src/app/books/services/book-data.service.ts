import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { Book, books } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  public listBooks(): Observable<Book[]> {
    return of(books);
  }
}
