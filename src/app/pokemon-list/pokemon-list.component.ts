import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../core/state/app.state';

import { selectAllPokemons } from '../core/state/pokemon/pokemon.reducer';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';

import { Pokemon } from '../core/state/pokemon/pokemon';
import { UrlHelperService } from '../core/services/url-helper.service';

@Component({
  selector: 'pkm-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  public pokemons$: Observable<Array<Pokemon>>;
  public queryString: string;

  constructor(private store: Store<AppState>, private urlHelper: UrlHelperService) {
    this.pokemons$ = this.store.select(selectAllPokemons);
    this.store.dispatch(new PokemonActions.GetAllPokemons());
  }

  public viewPokemonDetail(getUrl: string) {
    this.store.dispatch(new PokemonActions.GetPokemon({
      id: this.urlHelper.getPokemonIdFromUrl(getUrl) - 1,
      url: getUrl })
    );
  }
}
