import { Component, ChangeDetectionStrategy } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { FeatureDirective } from '@shared';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [RouterLink, FeatureDirective, RouterLinkActive],
  template: `
    <div class="navbar bg-base-100">
      <div class="flex-1">
        <a class="btn btn-ghost text-xl" routerLink="/">Applied Angular</a>
      </div>
      <div class="flex-none">
        <ul class="menu menu-horizontal px-1">
          <li *feature="'wip'">
            <a routerLink="demos" [routerLinkActive]="['underline']">Demos</a>
          </li>
          <li>
            <a routerLink="banking" [routerLinkActive]="['underline']"
              >Banking</a
            >
          </li>
          <li>
            <a routerLink="counter" [routerLinkActive]="['underline']"
              >Counter</a
            >
          </li>
          <li>
            <a routerLink="books" [routerLinkActive]="['underline']">Books</a>
          </li>
        </ul>
      </div>
    </div>
  `,
  styles: ``,
})
export class NavBarComponent {}
