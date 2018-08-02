import { Component, OnInit } from '@angular/core';

import { Store } from '@ngrx/store';

import { AppState } from './../../app.reducers';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import { Todo } from '../model/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  public pendientes: number;
  public filtroValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  public filtroAtual: fromFiltro.filtrosValidos;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    this.store.subscribe(state => {
      this.contarPendientes(state.todos);
      this.filtroAtual = state.filtro;
    });
  }

  public cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos): void {
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.store.dispatch(accion);
  }

  public contarPendientes(todos: Todo[]): void {
    this.pendientes = todos.filter(todo => !todo.completado).length;
  }

  public borrarTodo(): void {
    const accion = new fromTodo.BorrarAllTodoAction();
    this.store.dispatch(accion);
  }

}
