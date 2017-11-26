import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/concat';

import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { Pokemon, PokemonType } from './pokemon';

import * as PokemonActions from './pokemon.actions';
import * as TypeActions from '../type/type.actions';


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
    .switchMap((action: PokemonActions.GetAllPokemons) => {
      return this.http.get(this.apiUrl + 'pokemon/', {
        params: new HttpParams().set('limit', this.maxPokemons.toString())
      }).map((res: any) => new PokemonActions.SetPokemonList({
        pokemons: res.results.map((pokemon, index) => {
          const entity = Deserialize(pokemon, Pokemon);
          entity.id = index + 1; // pokemons are returned sorted by id
          return entity;
        })
      }));
    });

  @Effect()
  getPokemonIndirect$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_POKEMON_INDIRECT)
    .mergeMap((action: PokemonActions.GetPokemonIndirect) => {
      return this.http.get(action.payload.url)
        .map((res: any) => new PokemonActions.UpdatePokemonIndirect({
          pokemon: {
            id: action.payload.id,
            changes: Object.assign(Deserialize(res, Pokemon))
          }
        }))
        .catch(error => Observable.of(new PokemonActions.FetchError(error)));
    });

  @Effect()
  getPokemon$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_POKEMON)
    .mergeMap((action: PokemonActions.GetPokemon) => {
      return this.http.get(action.payload.url)
        .map((res: any) => new PokemonActions.UpdatePokemon({
          pokemon: {
            id: action.payload.id,
            changes: Object.assign(Deserialize(res, Pokemon))
          }
        }))
        .catch(error => Observable.of(new PokemonActions.FetchError(error)));
    });

  @Effect()
  updatePokemon$ = this.actions$
  .ofType(PokemonActions.UPDATE_POKEMON)
  .mergeMap((action: PokemonActions.UpdatePokemon) =>
    Observable.from(action.payload.pokemon.changes.types.map((pokemonType: PokemonType) =>
      new TypeActions.GetType({ url: pokemonType.type.url }))
    )
  );
}
