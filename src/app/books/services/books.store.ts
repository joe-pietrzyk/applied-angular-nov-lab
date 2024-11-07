import { withDevtools } from '@angular-architects/ngrx-toolkit';
import {
  patchState,
  signalStore,
  withHooks,
  withMethods,
  withState,
} from '@ngrx/signals';
import { rxMethod } from '@ngrx/signals/rxjs-interop';
import { Book, Century } from './types';
import { inject } from '@angular/core';
import { BooksService } from './books.service';
import { pipe, switchMap, tap } from 'rxjs';
import { setError, setFulfilled, setPending, withRequestStatus } from '@shared';
import { tapResponse } from '@ngrx/operators';

type BooksState = { data: Book[] };

const initialState: BooksState = { data: [] };

export const BooksStore = signalStore(
  withDevtools('books-store'),
  withState<BooksState>(initialState),
  withRequestStatus(),
  withMethods((store) => {
    const service = inject(BooksService);
    return {
      _load: rxMethod<void>(
        pipe(
          tap(() => patchState(store, setPending())),
          switchMap(() =>
            service.books().pipe(
              tapResponse({
                next(value) {
                  patchState(store, setFulfilled(), { data: value });
                },
                error() {
                  patchState(store, setError('Could not get books'));
                },
              }),
            ),
          ),
        ),
      ),
      centuries() {
        const results: Century[] = [];
        store.data().forEach((book) => {
          const century = Math.trunc(book.year / 100) + '00s';
          let found = false;
          const centuryEntry = { century, count: 1 };
          results
            .filter((r) => r.century === century)
            .forEach((r) => {
              r.count = r.count + 1;
              found = true;
            });
          if (!found) {
            results.push(centuryEntry);
          }
        });
        return results;
      },
    };
  }),
  withHooks({
    onInit(store) {
      store._load();
    },
  }),
);
