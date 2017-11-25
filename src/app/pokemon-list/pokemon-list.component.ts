import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../core/state/app.state';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';

@Component({
  selector: 'pkm-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(new PokemonActions.GetAllPokemons());
  }
}
