import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { AppState } from '../core/state/app.state';

import { selectAllPokemons } from '../core/state/pokemon/pokemon.reducer';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';
import * as UserInterfaceActions from '../core/state/user-interface/user-interface.actions';


import { Pokemon } from '../core/state/pokemon/pokemon';
import { UrlHelperService } from '../core/services/url-helper.service';
import { UserInterfaceState } from '../core/state/user-interface/user-interface';

@Component({
  selector: 'pkm-list',
  templateUrl: './pokemon-list.component.html',
  styleUrls: ['./pokemon-list.component.scss']
})
export class PokemonListComponent {
  public pokemons$: Observable<Array<Pokemon>>;
  public uiState$: Observable<UserInterfaceState>;

  constructor(private store: Store<AppState>, private urlHelper: UrlHelperService) {
    this.pokemons$ = this.store.select(selectAllPokemons);
    this.uiState$ = this.store.select('uiState');
    this.store.dispatch(new PokemonActions.GetAllPokemons());
  }

  public get paginatedPokemons$(): Observable<Array<Pokemon>> {
    return this.uiState$
      .combineLatest(this.pokemons$)
      .map(([uiState, pokemons]: [UserInterfaceState, Array<Pokemon>]) =>
        pokemons.slice(uiState.currentPage * uiState.perPage, (uiState.currentPage + 1) * uiState.perPage));
  }

  public get canMoveBackward(): Observable<boolean> {
    return this.uiState$.map((uiState: UserInterfaceState) => uiState.currentPage > 0);
  }

  public get canMoveForward(): Observable<boolean> {
    return this.uiState$.map((uiState: UserInterfaceState) => uiState.currentPage < uiState.maxPage);
  }

  public goToFirstPage() {
    this.store.dispatch(new UserInterfaceActions.FirstPage());
  }

  public goToPrevPage() {
    this.store.dispatch(new UserInterfaceActions.PrevPage());
  }

  public goToNextPage() {
    this.store.dispatch(new UserInterfaceActions.NextPage());
  }

  public goToLastPage() {
    this.store.dispatch(new UserInterfaceActions.LastPage());
  }
}
