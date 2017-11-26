import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';

import { Pokemon } from '../core/state/pokemon/pokemon';

@Component({
  selector: 'pkm-card',
  templateUrl: './pokemon-card.component.html'
})
export class PokemonCardComponent {
  @Input() public pokemon: Pokemon;

  constructor(private store: Store<AppState>) { }
}
