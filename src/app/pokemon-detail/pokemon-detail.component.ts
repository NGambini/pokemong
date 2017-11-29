import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs/Observable';
import { Params } from '@angular/router';

import { Pokemon, PokemonType } from '../core/state/pokemon/pokemon';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';
import * as TypeActions from '../core/state/type/type.actions';
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
  public pokemon: Pokemon;

  constructor(private store: Store<AppState>,
    private urlService: UrlHelperService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const routeId = parseInt(params['id'], 10);
      this.store.select(selectAllPokemons).subscribe((pokemons: Array<Pokemon>) =>
        this.pokemon = pokemons.find(p => p.id === routeId)
      );
    });
  }

  public getPokemonTypeRelations() {
    this.store.dispatch(new PokemonActions.GetPokemonTypeRelations({ pokemonId: this.pokemon.id }));
  }

  public calculateAverageStats(type: PokemonType) {
    const typeId = this.urlService.getIdFromUrl(type.type.url);
    this.store.dispatch(new TypeActions.CalculateAverageStats({ typeId: typeId, typeName: type.type.name }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
