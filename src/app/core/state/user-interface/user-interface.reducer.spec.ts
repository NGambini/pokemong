import { userInterfaceReducer } from './user-interface.reducer';
import * as UserInterfaceActions from './user-interface.actions';
import * as PokemonActions from '../pokemon/pokemon.actions';
import { UserInterfaceState } from './user-interface';
import { Pokemon } from '../pokemon/pokemon';

describe('UserInterfaceReducer', () => {
  let uiStateMock: UserInterfaceState;
  beforeEach(() => {
    uiStateMock = {
      searchString: '',
      currentPage: 0,
      maxPage: 0,
      perPage: 35
    };
  });

  it('should set max pages when getting pokemon list', () => {
    const pokemonArray = new Array<Pokemon>();
    for (let i = 0 ; i < 100 ; i++) {
      pokemonArray.push(new Pokemon());
    }
    const newState = userInterfaceReducer(uiStateMock, new PokemonActions.SetPokemonList( { pokemons: pokemonArray}));
    // 100 / 35 = 3 pages -> maxPage 2
    expect(newState.maxPage).toEqual(2);
  });

  it('should not go over last page', () => {
    uiStateMock.currentPage = uiStateMock.maxPage;
    const newState = userInterfaceReducer(uiStateMock, new UserInterfaceActions.NextPage());
    expect(newState.currentPage).toBeLessThanOrEqual(newState.maxPage);
    const newState2 = userInterfaceReducer(uiStateMock, new UserInterfaceActions.LastPage());
    expect(newState2.currentPage).toBeLessThanOrEqual(newState2.maxPage);
  });

  it('should not go below 0', () => {
    uiStateMock.currentPage = uiStateMock.maxPage;
    const newState = userInterfaceReducer(uiStateMock, new UserInterfaceActions.PrevPage());
    expect(newState.currentPage).toBeGreaterThanOrEqual(0);
    const newState2 = userInterfaceReducer(uiStateMock, new UserInterfaceActions.FirstPage());
    expect(newState2.currentPage).toBeGreaterThanOrEqual(0);
  });

});
