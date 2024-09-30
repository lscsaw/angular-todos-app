import { Component, computed, inject, input, output } from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Todo } from '../../../app';
import { toSignal } from '@angular/core/rxjs-interop';
import { TranslocoPipe } from '@jsverse/transloco';

@Component({
  selector: 'app-edit-todo-form',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoPipe],
  templateUrl: './edit-todo-form.component.html',
  styleUrl: './edit-todo-form.component.css',
})
export class EditTodoFormComponent {
  form = inject(NonNullableFormBuilder).group({
    name: [
      '',
      [Validators.required, Validators.minLength(3), Validators.maxLength(60)],
    ],
    description: [null as string | null],
    creator: ['Franz'],
  });

  formChanges = toSignal(this.form.valueChanges);

  todo = input.required({
    alias: 'todo',
    transform: (it: Todo | undefined) => {
      this.form.reset();
      if (it) {
        this.form.setValue({
          name: it.name,
          description: it.description ?? null,
          creator: it.creator.name,
        });
      }
      return it;
    },
  });

  isCreating = computed(() => !this.todo());

  create = output<Todo>();
  update = output<Todo>();

  submit(): void {
    const raw = this.form.getRawValue();
    if (this.isCreating()) {
      this.create.emit({
        ...raw,
        id: getRandomInt(10000),
        description: raw.description ?? undefined,
        createdAt: new Date(),
        status: 'TODO',
        creator: {
          name: raw.creator,
        },
      });

      return;
    }

    this.update.emit({
      ...raw,
      id: this.todo()!.id,
      description: raw.description ?? undefined,
      createdAt: this.todo()!.createdAt,
      status: this.todo()!.status,
      creator: {
        name: raw.creator,
      },
    });
  }
}

function getRandomInt(max: number): number {
  return Math.floor(Math.random() * max);
}
