import { Component, OnInit, OnDestroy } from '@angular/core';
// import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/models/usuario.model';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.reducers';
import { cargarUsuarios } from 'src/app/store/actions';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styles: []
})
export class ListaComponent implements OnInit, OnDestroy {

  usuarios: Usuario[];
  loading: boolean = false;
  error: any;

  usuariosSub: Subscription;

  constructor(
    private store: Store<AppState>
    // public usuarioService: UsuarioService,
  ) { }

  ngOnInit(): void {

    this.usuariosSub = this.store.select( 'usuarios' ).subscribe( ({ users, loading, error }) => {
      this.usuarios = users;
      this.loading = loading;
      this.error = error;
    });

    this.store.dispatch( cargarUsuarios() );
    // this.usuarioService.getUsers()
    //   .subscribe( users => {
    //     console.log( users );
    //     this.usuarios = users;
    //   });
  }

  ngOnDestroy(): void {
    this.usuariosSub.unsubscribe();
  }
}
