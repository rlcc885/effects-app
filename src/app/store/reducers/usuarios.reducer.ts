import { createReducer, on } from '@ngrx/store';
import { cargarUsuarios, cargarUsuariosSuccess, cargarUsuariosError } from '../actions';
import { Usuario } from 'src/app/models/usuario.model';

export interface UsuariosState {
  users: Usuario[],
  loaded: boolean,
  loading: boolean,
  error: any,
};

const initialState: UsuariosState = {
  users: [],
  loaded: false,
  loading: false,
  error: null,
};

const _usuariosReducer = createReducer( initialState,
  on( cargarUsuarios, state => ( { ...state, loading: true } )),
  on( cargarUsuariosSuccess, (state, { usuarios }) => ( {
    ...state,
    loading: false,
    loaded: true,
    users: [ ...usuarios ]
  } )),
  on( cargarUsuariosError, (state, { payload }) => ( {
    ...state,
    loading: false,
    loaded: false,
    error: payload,
  } )),
);

export function usuariosReducer(state, action) {
  return _usuariosReducer( state, action);
}
