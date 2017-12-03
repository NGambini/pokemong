import { ActionReducer, Action } from '@ngrx/store';

import * as UserInterfaceActions from './user-interface.actions';
import * as PokemonActions from '../pokemon/pokemon.actions';
import { UserInterfaceState } from './user-interface';

export const initialState: UserInterfaceState = {
  searchString: null,
  currentPage: 0,
  maxPage: 9,
  perPage: 35
};

export function userInterfaceReducer(state = initialState, action: UserInterfaceActions.All | PokemonActions.All): UserInterfaceState {
  let newPage;
  switch (action.type) {
    case PokemonActions.SET_POKEMON_LIST:
      const totalPokemons = (action as PokemonActions.SetPokemonList).payload.pokemons.length;
      const totalPages = Math.round(totalPokemons / state.perPage);
      return Object.assign({}, state, { maxPage: totalPages });
    case UserInterfaceActions.FIRST_PAGE:
      return Object.assign({}, state, { currentPage: 0 });
    case UserInterfaceActions.LAST_PAGE:
      return Object.assign({}, state, { currentPage: state.maxPage });
    case UserInterfaceActions.PREV_PAGE:
      newPage = state.currentPage - 1;
      if (newPage < 0) {
        newPage = 0;
      }
      return Object.assign({}, state, { currentPage: newPage });
    case UserInterfaceActions.NEXT_PAGE:
      newPage = state.currentPage + 1;
      if (newPage > state.maxPage) {
        newPage = state.maxPage;
      }
      return Object.assign({}, state, { currentPage: newPage });
    case UserInterfaceActions.SET_SEARCH:
      return Object.assign({}, state, { searchString: action.payload.search });
    default:
      return state;
  }
}
