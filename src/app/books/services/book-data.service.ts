import { Injectable } from '@angular/core';

import { BehaviorSubject, Observable, of, Subject } from 'rxjs';

import { Book, books } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  _books = books;
  books$: Subject<Book[]> = new BehaviorSubject(this._books);
  public listBooks(): Observable<Book[]> {
    console.log('list books');
    return this.books$;
  }

  public createBook(book: Book): Observable<Book> {
    book.uid = `id-${new Date().toISOString()}`;
    this._books.push(book);
    this.books$.next(this._books);
    return of(book);
  }

  public updateBook(book: Book): Observable<Book> {
    const index = books.findIndex((_book) => _book.uid === book.uid);
    this._books[index] = book;
    this.books$.next(this._books);
    return of(book);
  }
}
