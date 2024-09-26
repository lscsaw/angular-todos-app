import { Component, input, output } from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../../app';
import { RouterLink } from '@angular/router';

@Component({
  template: `
    @if (todo(); as todo) {
      <article
        [class.done]="todo.status === 'DONE'"
        [class.todo]="todo.status === 'TODO'"
        [style.font-weight]="todo.status === 'TODO' ? '600' : '500'"
      >
        <h3>
          <a [routerLink]="todo.id.toString()">
            {{ todo.name }} - {{ todo.creator.name }} ({{
              todo.createdAt | date: 'HH:mm:ss dd.MM.YYYY'
            }})
          </a>
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
    }
  `,
  selector: 'app-todo',
  standalone: true,
  imports: [DatePipe, RouterLink],
  styleUrl: './todo.component.css',
})
export class TodoComponent {
  todo = input.required<Todo>();

  updateStatus = output<Todo['status']>();
  removeTodo = output();
}
