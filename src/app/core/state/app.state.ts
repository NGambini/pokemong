import { EntityState } from '@ngrx/entity';
import { Pokemon } from './pokemon/pokemon';

export class AppState {
  public pokemons: EntityState<Pokemon>;
}
