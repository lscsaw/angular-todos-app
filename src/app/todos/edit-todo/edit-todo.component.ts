import { Component, inject } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { map, of, switchMap } from 'rxjs';
import { toSignal } from '@angular/core/rxjs-interop';
import { TodosService } from '../todos.service';
import { EditTodoFormComponent } from './edit-todo-form/edit-todo-form.component';
import { Todo } from '../../app';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [EditTodoFormComponent],
  template: `
    <app-edit-todo-form
      [todo]="todo()"
      (create)="create($event)"
      (update)="update($event)"
    />
  `,
})
export class EditTodoComponent {
  private todosService = inject(TodosService);
  private router = inject(Router);

  id$ = inject(ActivatedRoute).paramMap.pipe(
    map((params) => params.get('id')),
    map((id) => {
      if (Number.isNaN(id)) {
        return undefined;
      }
      return Number(id);
    }),
  );

  todo = toSignal(
    this.id$.pipe(
      switchMap((id) => (id ? this.todosService.getTodo$(id) : of(undefined))),
    ),
  );

  create($event: Todo) {
    this.todosService.createTodo($event);
    void this.router.navigate(['/']);
  }

  update($event: Todo) {
    this.todosService.updateTodo($event);
    void this.router.navigate(['/']);
  }
}
