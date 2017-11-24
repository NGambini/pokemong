import { Action } from '@ngrx/store';
import { Pokemon } from './pokemon';

export const GET_POKEMON = 'GET_POKEMON';
export const UPDATE_POKEMON = 'UPDATE_POKEMON';

export class GetPokemon implements Action {
  readonly type = GET_POKEMON;
}

export class UpdatePokemon implements Action {
  readonly type = UPDATE_POKEMON;

  constructor(public payload: { pokemon: { id: number, changes: Pokemon } }) {}
}

export type All = GetPokemon | UpdatePokemon;
