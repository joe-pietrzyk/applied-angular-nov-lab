import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { BookListComponent } from './components/book-list.component';
import { CenturyListComponent } from './components/century-list.component';
import { BooksService } from './services/books.service';
import { BooksStore } from './services/books.store';

@Component({
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [BookListComponent, CenturyListComponent],
  template: ` <ul>
    <li><app-book-list [books]="this.books.data()" /></li>
    <li><app-century-list [centuries]="this.books.centuries()" /></li>
  </ul>`,
  styles: ``,
})
export class BooksComponent {
  books = inject(BooksStore);
}
