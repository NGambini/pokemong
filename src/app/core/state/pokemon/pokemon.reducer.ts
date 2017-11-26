import { ActionReducer, Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

import * as PokemonActions from './pokemon.actions';
import { Pokemon } from './pokemon';

export const adapter: EntityAdapter<Pokemon> = createEntityAdapter<Pokemon>();
export const initialState: EntityState<Pokemon> = adapter.getInitialState();

export function pokemonReducer(state = initialState, action: PokemonActions.All): EntityState<Pokemon> {
  switch (action.type) {
    case PokemonActions.SET_POKEMON_LIST:
      return adapter.addMany(action.payload.pokemons, state);
    case PokemonActions.UPDATE_POKEMON:
    case PokemonActions.UPDATE_POKEMON_INDIRECT:
      return adapter.updateOne(action.payload.pokemon, state);
    default:
      return state;
  }
}

export const selectPokemonState = createFeatureSelector<EntityState<Pokemon>>('pokemons');

export const { selectAll: selectAllPokemons, selectIds: selectPokemonIds } = adapter.getSelectors(
  selectPokemonState
);
