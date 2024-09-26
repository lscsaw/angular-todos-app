import {
  ChangeDetectionStrategy,
  Component,
  computed,
  signal,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { Todo } from '../application';
import { TodoComponent } from './todo/todo.component';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [DatePipe, TodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  todos = signal<Todo[]>([
    {
      id: 1,
      name: 'Saugen',
      creator: {
        name: 'Franz',
      },
      createdAt: new Date(),
      status: 'TODO',
    },
    {
      id: 2,
      name: 'Wäsche',
      description: 'Wichtige Aufgabe',
      creator: {
        name: 'Franz',
      },
      createdAt: new Date(),
      status: 'TODO',
    },
  ]);

  todoTodos = computed(() => this.todos().filter((it) => it.status === 'TODO'));
  doneTodos = computed(() => this.todos().filter((it) => it.status === 'DONE'));

  updateStatus(id: number, status: Todo['status']): void {
    this.todos.update((todos) => {
      const todo = todos.find((it) => it.id === id);
      if (todo) {
        todo.status = status;
      }
      return [...todos];
    });
  }

  removeTodo(id: number): void {
    this.todos.update((todos) => {
      const index = todos.findIndex((it) => it.id === id);
      todos.splice(index, 1);
      return [...todos];
    });
  }
}
