import {
  ChangeDetectionStrategy,
  Component,
  computed,
  inject,
} from '@angular/core';
import { TodoComponent } from './todo/todo.component';
import { TodosService } from './todos.service';

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [TodoComponent],
  templateUrl: './todos.component.html',
  styleUrl: './todos.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TodosComponent {
  todosService = inject(TodosService);
  todos = this.todosService.todos;

  todoTodos = computed(() => this.todos().filter((it) => it.status === 'TODO'));
  doneTodos = computed(() => this.todos().filter((it) => it.status === 'DONE'));
}
