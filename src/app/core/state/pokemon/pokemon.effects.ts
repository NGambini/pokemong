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
import { selectPokemonIds, selectAllPokemons, selectPokemonEntities } from './pokemon.reducer';
import { EntityState } from '@ngrx/entity';
import { Dictionary } from '@ngrx/entity/src/models';

import { UrlHelperService } from '../../services/url-helper.service';


@Injectable()
export class PokemonEffects {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/';
  // TODO improvement : get that number from API then use it in another request
  private maxPokemons = 949;

  constructor(private actions$: Actions,
              private http: HttpClient,
              private store: Store<AppState>,
              private urlHelper: UrlHelperService) {
  }

  @Effect()
  getAllPokemons$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_ALL_POKEMONS)
    .withLatestFrom(this.store.select(selectPokemonIds))
    .switchMap(([action, pokemonIds]: [PokemonActions.GetAllPokemons, number[]]) => {
      // get the pokemon list only if not present in local storage
      return pokemonIds.length !== this.maxPokemons ? (this.http.get(this.apiUrl + 'pokemon/', {
        params: new HttpParams().set('limit', this.maxPokemons.toString())
      }).map((res: any) => new PokemonActions.SetPokemonList({
        pokemons: res.results.map((pokemon, index) => {
          const entity = Deserialize(pokemon, Pokemon);
          entity.id = this.urlHelper.getIdFromUrl(pokemon.url);
          return entity;
        })
      }))
      .catch(error => Observable.of(new PokemonActions.FetchError(error))))
      : Observable.of({ type: 'NO_ACTION' });
    });

  @Effect()
  getPokemon$ = this.actions$
    // Listen for the 'GET_POKEMON' action
    .ofType(PokemonActions.GET_POKEMON)
    .withLatestFrom(this.store.select(selectPokemonEntities))
    .mergeMap(([action, pokemons]: [PokemonActions.GetPokemon, Dictionary<Pokemon>]) => {
      const entityId = this.urlHelper.getIdFromUrl(action.payload.url);
      // if height is null, pokemon wasnt fetched
      return pokemons[entityId].height === undefined ? (this.http.get(action.payload.url)
        .map((res: any) => new PokemonActions.UpdatePokemon({
          pokemon: {
            id: action.payload.id,
            changes: Object.assign(Deserialize(res, Pokemon))
          }
        }))
        .catch(error => Observable.of(new PokemonActions.FetchError(error))))
        : Observable.of({ type: 'NO_ACTION' });
    });

  @Effect()
  getPokemonTypeRelations$ = this.actions$
    .ofType(PokemonActions.GET_POKEMON_TYPE_RELATIONS)
    .withLatestFrom(this.store.select(selectPokemonEntities))
    .mergeMap(([action, pokemons]: [PokemonActions.GetPokemonTypeRelations, Dictionary<Pokemon>]) => {
      const pokemon = pokemons[action.payload.pokemonId];
      return Observable.from(pokemon.types.map((pokemonType: PokemonType) =>
        new TypeActions.GetType({ url: pokemonType.type.url }))
      ); }
    );

  @Effect()
  updatePokemon$ = this.actions$
    .ofType(PokemonActions.UPDATE_POKEMON)
    .mergeMap((action: PokemonActions.UpdatePokemon) => {
      return Observable.from(action.payload.pokemon.changes.types.map((pokemonType: PokemonType) => {
        const typeId = this.urlHelper.getIdFromUrl(pokemonType.type.url);
        return new TypeActions.CalculateAverageStats({ typeId: typeId, typeName: pokemonType.type.name });
      }));
    });
}
