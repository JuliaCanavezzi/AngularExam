import { Author } from './../interface/author';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {
  apiUrl = 'http://localhost:3000/author'

  constructor(private httpClient: HttpClient) { }

  getAuthor(): Observable<Author[]>{
    return this.httpClient.get<Author[]>(this.apiUrl)
  }
  save(author: Author): Observable<Author>{
    return this.httpClient.post<Author>(this.apiUrl, author)
  }

  modify(author: Author): Observable<Author>{
    return this.httpClient.put<Author>(`${this.apiUrl}/${author.id}`, author)
  }
  delete(author: Author): Observable<void>{
    return this.httpClient.delete<void>(`${this.apiUrl}/${author.id}`)
  }

}
