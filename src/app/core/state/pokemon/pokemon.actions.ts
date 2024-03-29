import { Action } from '@ngrx/store';
import { Pokemon } from './pokemon';
import { Type } from '../type/type';

export const GET_POKEMON = 'GET_POKEMON';
export const GET_POKEMON_TYPE_RELATIONS = 'GET_POKEMON_TYPE_RELATIONS';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SET_POKEMON_LIST = 'SET_POKEMON_LIST';
export const UPDATE_POKEMON = 'UPDATE_POKEMON';
export const FETCH_ERROR = 'FETCH_ERROR';
export const GET_POKEMON_TWEETS = 'GET_POKEMON_TWEETS';
export const APPEND_POKEMON_TWEETS = 'APPEND_POKEMON_TWEETS';

export class GetAllPokemons implements Action {
  readonly type = GET_ALL_POKEMONS;

  constructor() {}
}

export class GetPokemonTweets implements Action {
  readonly type = GET_POKEMON_TWEETS;

  constructor(public payload: { pokemonId: number, sinceId: string }) {}
}

export class AppendPokemonTweets implements Action {
  readonly type = APPEND_POKEMON_TWEETS;

  constructor(public payload: { pokemon: { id: number, changes: Partial<Pokemon> }} ) {}
}

export class GetPokemonTypeRelations implements Action {
  readonly type = GET_POKEMON_TYPE_RELATIONS;

  constructor(public payload: { pokemonId: number }) {}
}

export class GetPokemon implements Action {
  readonly type = GET_POKEMON;

  constructor(public payload: { id: number, url: string }) {}
}

export class UpdatePokemon implements Action {
  readonly type = UPDATE_POKEMON;

  constructor(public payload: { pokemon: { id: number, changes: Pokemon } }) {}
}

export class SetPokemonList implements Action {
  readonly type = SET_POKEMON_LIST;

  constructor(public payload: { pokemons: Pokemon[] }) {}
}

export class FetchError implements Action {
  readonly type = FETCH_ERROR;

  constructor(public payload: { error: string }) {}
}

export type All = GetPokemon |
                  GetAllPokemons |
                  UpdatePokemon |
                  SetPokemonList |
                  FetchError |
                  GetPokemonTweets |
                  AppendPokemonTweets |
                  GetPokemonTypeRelations;
