import { Action } from '@ngrx/store';
import { Pokemon } from './pokemon';

export const GET_POKEMON = 'GET_POKEMON';
export const GET_POKEMON_INDIRECT = 'GET_POKEMON_INDIRECT';
export const GET_POKEMON_TYPE_RELATIONS = 'GET_POKEMON_TYPE_RELATIONS';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SET_POKEMON_LIST = 'SET_POKEMON_LIST';
export const UPDATE_POKEMON = 'UPDATE_POKEMON';
export const UPDATE_POKEMON_INDIRECT = 'UPDATE_POKEMON_INDIRECT';
export const FETCH_ERROR = 'FETCH_ERROR';

export class GetAllPokemons implements Action {
  readonly type = GET_ALL_POKEMONS;

  constructor() {}
}

// Gets a pokemon without triggering GET of its TYPE
export class GetPokemonIndirect implements Action {
  readonly type = GET_POKEMON_INDIRECT;

  constructor(public payload: { id: number, url: string }) {}
}

export class UpdatePokemonIndirect implements Action {
  readonly type = UPDATE_POKEMON_INDIRECT;

  constructor(public payload: { pokemon: { id: number, changes: Pokemon } }) {}
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
                  UpdatePokemonIndirect |
                  SetPokemonList |
                  FetchError;
