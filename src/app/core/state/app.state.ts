import { EntityState } from '@ngrx/entity';
import { Pokemon } from './pokemon/pokemon';
import { Type } from './type/type';
import { UserInterfaceState } from './user-interface/user-interface';

export class AppState {
  public pokemons: EntityState<Pokemon>;
  public types: EntityState<Type>;
  public uiState: UserInterfaceState;
}
