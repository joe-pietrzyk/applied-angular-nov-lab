import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

@Injectable()
export class BooksService {
  #client = inject(HttpClient);

  books() {
    return this.#client
      .get<{
        data: { id: string; title: string; author: string; year: number }[];
      }>('/api/books')
      .pipe(map((res) => res.data));
  }
}
