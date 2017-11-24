import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { Pokemon } from './pokemon';
import * as PokemonActions from './pokemon.actions';


@Injectable()
export class PokemonEffects {
  constructor(private actions$: Actions, store: Store<AppState>) { }

  @Effect()
  getPokemon$ = this.actions$.ofType()

  @Effect()
  login$ = this.actions$
    // Listen for the 'LOGIN' action
    .ofType(PokemonActions.GET_POKEMON)
    .map((action: any) => this.post('/users/sign_in', action.payload)
      // If successful, dispatch success action with result
      .map(res => new PokemonActions.UpdatePokemon(pokemon: {
        id: 1,
        changes: Deserialize
      })
      // If request fails, dispatch failed action
      .catch(res => Observable.of({ type: AuthActions.POST_LOGIN_FAILURE, payload: res.error })))
    .share();

  // @Effect()
  // signup$ = this.actions$
  //   // Listen for the 'LOGIN' action
  //   .ofType(AuthActions.POST_SIGNUP)
  //   .flatMap((action: any) => this.post('/users', { user: action.payload })
  //     // If successful, dispatch success action with result
  //     .map(res => { return { type: AuthActions.POST_SIGNUP_SUCCESS, payload: res } })
  //     // If request fails, dispatch failed action
  //     .catch(res => Observable.of({ type: AuthActions.POST_SIGNUP_FAILURE, payload: res.error })))
  //   .share();
}
