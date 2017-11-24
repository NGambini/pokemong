import { ActionReducer, Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PokemonActions from './pokemon.actions';
import { Pokemon } from './pokemon';

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();
export const initialState: EntityState<Pokemon> = adapter.getInitialState();

export function pokemonReducer(state = initialState, action: PokemonActions.All): EntityState<Pokemon> {
  switch (action.type) {
    case PokemonActions.UPDATE_POKEMON:
      return adapter.updateOne(action.payload.pokemon, state);
    default:
      return state;
  }
}
