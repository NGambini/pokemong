import { Action } from '@ngrx/store';
import { Pokemon } from './pokemon';

export const GET_POKEMON = 'GET_POKEMON';
export const GET_ALL_POKEMONS = 'GET_ALL_POKEMONS';
export const SET_POKEMON_LIST = 'UPDATE_POKEMON_LIST';
export const SET_POKEMON = 'UPDATE_POKEMON';

export class GetAllPokemons implements Action {
  readonly type = GET_ALL_POKEMONS;

  constructor() {}
}

export class GetPokemon implements Action {
  readonly type = GET_POKEMON;

  constructor(public payload: { id: number }) {}
}

export class UpdatePokemon implements Action {
  readonly type = SET_POKEMON;

  constructor(public payload: { pokemon: Pokemon }) {}
}

export class UpdatePokemonList implements Action {
  readonly type = SET_POKEMON_LIST;

  constructor(public payload: { pokemons: Pokemon[] }) {}
}

export type All = GetPokemon |
                  GetAllPokemons |
                  UpdatePokemon |
                  UpdatePokemonList;
