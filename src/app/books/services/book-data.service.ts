import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';

import { map, Observable } from 'rxjs';

import { Book } from '../models';

@Injectable({
  providedIn: 'root',
})
export class BookDataService {
  private httpClient = inject(HttpClient);
  apiUrl = 'http://localhost:3000/books';

  public createBook(book: Book): Observable<Book> {
    book.id = `id-${new Date().toISOString()}`;

    return this.httpClient.post<Book>(this.apiUrl, book);
  }

  public listBooks(params?: string[]): Observable<Book[]> {
    const paramString = params?.join('&');
    const value = `${this.apiUrl}${paramString ? '?' + paramString : ''}`;

    return this.httpClient.get<Book[]>(
      value
    );
  }

  public updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }

  public getLength(): Observable<number> {
    return this.httpClient.get<Book[]>(`${this.apiUrl}`).pipe(
      map((books) => {
        return books ? books.length : 0;
      })
    );
  }
}
