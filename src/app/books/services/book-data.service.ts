import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";

import { Observable } from "rxjs";

import { Book} from "../models";

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

  public listBooks(): Observable<Book[]> {
    return this.httpClient.get<Book[]>(this.apiUrl);
  }

  public updateBook(book: Book): Observable<Book> {
    return this.httpClient.put<Book>(`${this.apiUrl}/${book.id}`, book);
  }
}
