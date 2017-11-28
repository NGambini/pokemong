import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Actions, Effect } from '@ngrx/effects';
import { Deserialize } from 'cerialize';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/switchMap';
import { Store } from '@ngrx/store';

import { AppState } from '../app.state';
import { Type, TypePokemon } from './type';

import * as TypeActions from './type.actions';
import * as PokemonActions from '../pokemon/pokemon.actions';
import { selectPokemonIds, selectAllPokemons, selectPokemonEntities } from '../pokemon/pokemon.reducer';

import { UrlHelperService } from '../../services/url-helper.service';
import { Dictionary } from '@ngrx/entity/src/models';
import { Pokemon, PokemonStat } from '../pokemon/pokemon';

@Injectable()
export class TypeEffects {
  private readonly apiUrl = 'https://pokeapi.co/api/v2/';
  // TODO improvement : get that number from API then use it in another request
  private maxPokemons = 949;

  constructor(
    private actions$: Actions,
    private http: HttpClient,
    private store: Store<AppState>,
    private urlHelper: UrlHelperService
  ) { }

  @Effect()
  getType$ = this.actions$
  // Listen for the 'GET_TYPE' action
  .ofType(TypeActions.GET_TYPE)
  // todo add or update
  .mergeMap((action: TypeActions.GetType) => this.http.get(action.payload.url)
    .map((res: any) => new TypeActions.AddType({
      type: Deserialize(res, Type)
    }))
  );

  @Effect()
  addType$ = this.actions$
  // Listen for the 'ADD_TYPE' action
  .ofType(TypeActions.ADD_TYPE)
  .switchMap((action: TypeActions.AddType) =>
    Observable.from(action.payload.type.pokemon.map((typePokemon: TypePokemon) => {
      return new PokemonActions.GetPokemon({
        id: this.urlHelper.getPokemonIdFromUrl(typePokemon.pokemon.url),
        url: typePokemon.pokemon.url
      });
    }))
  );

  @Effect()
  calculateAverageStats$ = this.actions$
    .ofType(TypeActions.CALCULATE_AVERAGE_STATS)
    .combineLatest(this.store.select(selectPokemonEntities))
    .map(([action, pokemons]: [TypeActions.CalculateAverageStats, Dictionary<Pokemon>]) => {
      const statsValues = [];
      const pokemonsOfType = Object.entries(pokemons)
        .map(([str, pokemon]: [string, Pokemon]) => pokemon)
        .filter((p: Pokemon) => p.types.some(t => t.type.name === action.payload.typeName));
      pokemonsOfType.forEach((p: Pokemon) =>
        p.stats.forEach((pStat: PokemonStat) => {
          statsValues[pStat.stat.name].push(pStat.baseStat);
        })
      );
      const statsAvgs = statsValues.map((statValues: Array<number>) => {
        const sum = statValues.reduce(function(a, b) { return a + b; });
        return sum / statValues.length;
      });
      return new TypeActions.SetAverageStats({ typeId: action.payload.typeId, stats: statsAvgs} );
    });
}
