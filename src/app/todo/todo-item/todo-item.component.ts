import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';

import { Todo } from '../model/todo.model';
import { AppState } from '../../app.reducers';
import {
  ToggleTodoAction,
  EditarTodoAction,
  BorrarTodoAction
} from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {
  public editando: boolean;

  public chkField: FormControl;
  public txtInput: FormControl;

  @Input() todo: Todo;

  @ViewChild('txtInputFisico') txtInputFisico: ElementRef;

  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.chkField = new FormControl(this.todo.completado);
    this.txtInput = new FormControl(this.todo.texto, Validators.required);
    this.chkField.valueChanges.subscribe(() => {
      const accion = new ToggleTodoAction(this.todo.id);
      this.store.dispatch(accion);
    });
  }

  public editar(): void {
    this.editando = true;
    setTimeout(() => {
      this.txtInputFisico.nativeElement.select();
    }, 1);
  }

  public terminarEdicion(): void {
    this.editando = false;

    if (this.txtInput.invalid) {
      return;
    }

    if (this.txtInput.value === this.todo.texto) {
      return;
    }

    const accion = new EditarTodoAction(this.todo.id, this.txtInput.value);
    this.store.dispatch(accion);
  }

  public borrarTodo(): void {
    const accion = new BorrarTodoAction(this.todo.id);
    this.store.dispatch(accion);
  }
}
