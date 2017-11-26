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
import { UrlHelperService } from '../../services/url-helper.service';

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
  .concatMap((action: TypeActions.GetType) => this.http.get(action.payload.url)
    .map((res: any) => new TypeActions.AddType({
      type: Deserialize(res, Type)
    }))
  );

  @Effect()
  addType$ = this.actions$
  // Listen for the 'GET_TYPE' action
  .ofType(TypeActions.ADD_TYPE)
  .concatMap((action: TypeActions.AddType) =>
    Observable.from(action.payload.type.pokemon.map((typePokemon: TypePokemon) => {
      return new PokemonActions.GetPokemonIndirect({
        id: this.urlHelper.getPokemonIdFromUrl(typePokemon.pokemon.url),
        url: typePokemon.pokemon.url
      });
    }))
  );
}
