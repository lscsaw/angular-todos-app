import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap } from 'rxjs';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { TodosService } from '../todos.service';
import { TodoComponent } from '../todo/todo.component';

@Component({
  selector: 'app-edit-todo',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './edit-todo.component.html',
  styleUrl: './edit-todo.component.css',
})
export class EditTodoComponent {
  todosService = inject(TodosService);

  id$ = inject(ActivatedRoute).paramMap.pipe(
    map((params) => params.get('id')),
    map((id) => {
      if (Number.isNaN(id)) {
        throw new Error(`${id} is not a number`);
      }
      return Number(id);
    }),
  );

  todo = toSignal(
    this.id$.pipe(switchMap((id) => this.todosService.getTodo$(id))),
  );
}
