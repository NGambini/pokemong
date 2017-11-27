import { Component, Input, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';

import { Pokemon } from '../core/state/pokemon/pokemon';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';
import { UrlHelperService } from '../core/services/url-helper.service';

@Component({
  selector: 'pkm-card',
  templateUrl: './pokemon-card.component.html',
  styleUrls: ['./pokemon-card.component.scss']
})
export class PokemonCardComponent implements OnInit {
  @Input() public pokemon: Pokemon;

  constructor(private store: Store<AppState>, private urlService: UrlHelperService) { }

  public ngOnInit() {
    // if component is rendered with unfetched pokemon, display get action
    if (!this.pokemon.isLoaded) {
      // this.store.dispatch(new PokemonActions.GetPokemonIndirect({
      //   id: this.urlService.getPokemonIdFromUrl(this.pokemon.url),
      //   url: this.pokemon.url
      // }));
    }
  }
}
