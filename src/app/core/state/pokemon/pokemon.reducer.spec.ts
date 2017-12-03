import { EntityState } from '@ngrx/entity';
import { pokemonReducer, initialState } from './pokemon.reducer';
import * as PokemonActions from './pokemon.actions';
import { Pokemon } from './pokemon';
import { Dictionary } from '@ngrx/entity/src/models';

describe('PokemonReducer', () => {
  const pokemonStateMock = initialState;

  it('should add many pokemons to list', () => {
    const mockedPokemons: Array<Pokemon> = [
      {
        name: 'bulbasaur',
        url: 'pokeapi.co/api/v2/pokemon/1'
      } as Pokemon,
      {
        name: 'charmander',
        url: 'pokeapi.co/api/v2/pokemon/3'
      } as Pokemon
    ];
    const newState = pokemonReducer(pokemonStateMock, new PokemonActions.SetPokemonList( { pokemons: mockedPokemons }));
  });

  it('should update specific pokemon', () => {
    const mockedPokemons: Array<Pokemon> = [
      {
        name: 'bulbasaur',
        id: 1,
        url: 'pokeapi.co/api/v2/pokemon/1'
      } as Pokemon,
      {
        name: 'charmander',
        id: 3,
        url: 'pokeapi.co/api/v2/pokemon/3'
      } as Pokemon
    ];
    const mockedPokemonUpdate: Pokemon = {
      height: 55,
      id: 1,
      name: 'bulbasaur',
      weight: 55
    } as Pokemon;
    const stateWithPokemons = pokemonReducer(pokemonStateMock, new PokemonActions.SetPokemonList( { pokemons: mockedPokemons }));
    const stateAfterUpdate = pokemonReducer(
      stateWithPokemons,
      new PokemonActions.UpdatePokemon({
        pokemon: {
          id: 1,
          changes: mockedPokemonUpdate
        }
      }));
    expect(stateAfterUpdate.entities[1].height).toEqual(55);
  });
});
