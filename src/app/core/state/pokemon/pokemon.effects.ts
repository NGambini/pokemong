import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { Pokemon } from './pokemon';
import * as PokemonActions from './pokemon.actions';


@Injectable()
export class PokemonEffects {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/';
  // TODO improvement : get that number from API then use it in another request
  private maxPokemons = 949;
  constructor(private actions$: Actions, private http: HttpClient, store: Store<AppState>) { }

  @Effect()
  getAllPokemons$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_ALL_POKEMONS)
    .switchMap((action: any) => {
      return this.http.get(this.apiUrl + 'pokemon/', {
        params: new HttpParams().set('limit', this.maxPokemons.toString())
      }).map((res: any) => new PokemonActions.UpdatePokemonList({
        pokemons: res.results.map((pokemon, index) => {
          const entity = Deserialize(pokemon, Pokemon);
          entity.id = index + 1; // pokemons are returned sorted by id

          return entity;
        })
      }));
    }
    // If request fails, dispatch failed action
    // .catch(res => console.log(res))
    );

  @Effect()
  getPokemon$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_POKEMON)
    .map((action: any) => this.http.post('/users/sign_in', action.payload)
      // If successful, dispatch success action with result
      .map(res => new PokemonActions.UpdatePokemon({
        pokemon: Deserialize(res, Pokemon)
      })));
  // If request fails, dispatch failed action
  // .catch(res => Observable.of({ type: AuthActions.POST_LOGIN_FAILURE, payload: res.error })))

}
