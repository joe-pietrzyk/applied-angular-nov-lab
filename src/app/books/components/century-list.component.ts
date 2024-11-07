import { Component, ChangeDetectionStrategy, input } from '@angular/core';

@Component({
  selector: 'app-century-list',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [],
  template: `<table class="table-zebra table-md">
    <thead>
      <tr>
        <th>Century</th>
        <th>Number Of Books</th>
      </tr>
    </thead>
    <tbody>
      @for (century of centuries(); track century.century) {
        <tr>
          <th>{{ century.century }}</th>
          <th>{{ century.count }}</th>
        </tr>
      }
    </tbody>
  </table>`,
  styles: ``,
})
export class CenturyListComponent {
  centuries = input.required<
    { century: string; count: number }[] | undefined
  >();
}
