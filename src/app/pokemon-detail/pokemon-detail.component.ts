import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs/Observable';
import { Params } from '@angular/router';

import { Pokemon } from '../core/state/pokemon/pokemon';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';
import { UrlHelperService } from '../core/services/url-helper.service';
import { selectAllPokemons } from '../core/state/pokemon/pokemon.reducer';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';



@Component({
  selector: 'pkm-detail-view',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  public pokemon$: Observable<Pokemon>;

  constructor(private store: Store<AppState>,
    private urlService: UrlHelperService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const routeId = params['id'];
      console.log('found pokemon id:', routeId);
      this.pokemon$ = this.store.select(selectAllPokemons).map((pokemons: Array<Pokemon>) =>
        pokemons.find(p => p.id === routeId)
      );
    });

    // // dispatch get in any case, it will be blocked in effect if we already have the data
    // this.store.dispatch(new PokemonActions.GetPokemon({
    //   id: this.urlService.getPokemonIdFromUrl(this.pokemon.url),
    //   url: 
    // }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
