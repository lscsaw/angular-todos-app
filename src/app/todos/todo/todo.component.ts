import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../../application';

@Component({
  selector: 'app-todo',
  standalone: true,
  imports: [DatePipe],
  template: `
    @if (todo(); as todo) {
      <article>
        <h3>
          <div>
            {{ todo.name }} - {{ todo.creator.name }} ({{
              todo.createdAt | date: 'HH:mm:ss dd.MM.YYYY'
            }})
          </div>
          <div class="btn-list">
            @if (todo.status === 'TODO') {
              <button (click)="updateStatus.emit('DONE')">Done</button>
            } @else {
              <button (click)="updateStatus.emit('TODO')">Restore</button>
            }
            <button (click)="removeTodo.emit()">Delete</button>
          </div>
        </h3>
        @if (todo.description) {
          <div style="border: 1px black solid; padding: 5px">
            {{ todo.description }}
          </div>
        } @else {
          <span>Keine genau Beschreibung :( </span>
        }
      </article>
      <hr />
    }
  `,
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todo = input.required<Todo>();

  updateStatus = output<Todo['status']>();
  removeTodo = output();
}
