import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>
      <span>Todos</span>
      <div>
        <a routerLink="/todos/create">Neu</a>
        <a routerLink="/todos">Alle Todos</a>
      </div>
    </h1>
    <router-outlet />
  `,
  styles: `
    h1 {
      display: flex;
      justify-content: space-between;

      div {
        display: flex;
        gap: 1.5rem;
      }
    }
  `,
})
export class AppComponent {}
