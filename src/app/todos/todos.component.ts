import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { DatePipe } from '@angular/common';

type Todo = {
  id: number;
  name: string;
  description?: string;
  creator: {
    name: string;
  };
  createdAt: Date;
};

@Component({
  selector: 'app-todos',
  standalone: true,
  imports: [DatePipe],
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
    },
    {
      id: 2,
      name: 'Wäsche',
      description: 'Wichtige Aufgabe',
      creator: {
        name: 'Franz',
      },
      createdAt: new Date(),
    },
  ]);

  removeTodo(id: number) {
    this.todos.update((todos) => {
      const index = todos.findIndex((it) => it.id === id);
      todos.splice(index, 1);
      return [...todos];
    });
  }
}
