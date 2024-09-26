import { Injectable, signal } from '@angular/core';
import { Todo } from '../app';
import { toObservable } from '@angular/core/rxjs-interop';
import { find, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
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

  private todos$ = toObservable(this.todos);

  getTodo$(id: number): Observable<Todo | undefined> {
    return this.todos$.pipe(
      map((todos) => todos.find((todo) => todo.id === id)),
    );
  }

  createTodo(todo: Todo) {
    this.todos.update((todos) => [...todos, todo]);
  }

  updateTodo(updatedTodo: Todo) {
    this.todos.update((todos) => {
      const index = todos.findIndex((todo) => todo.id === updatedTodo.id);
      if (index !== -1) {
        todos[index] = updatedTodo; // Merge existing and updated fields
      }
      return [...todos]; // Return the updated list
    });
  }

  updateStatus(id: number, status: Todo['status']): void {
    this.todos.update((todos) => {
      const index = todos.findIndex((it) => it.id === id);
      if (index !== -1) {
        todos[index] = { ...todos[index], status }; // Merge existing and updated fields
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
