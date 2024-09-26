import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'todos',
    pathMatch: 'full',
  },
  {
    path: 'todos',
    loadComponent: () =>
      import('./todos/todos.component').then((c) => c.TodosComponent),
  },
  {
    path: 'todos/:id',
    loadComponent: () =>
      import('./todos/edit-todo/edit-todo.component').then(
        (c) => c.EditTodoComponent,
      ),
  },
];
