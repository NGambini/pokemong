import { Component, Input, OnInit, OnDestroy, AfterViewChecked } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../core/state/app.state';
import { Observable } from 'rxjs/Observable';
import { Params } from '@angular/router';

import { Pokemon, PokemonType } from '../core/state/pokemon/pokemon';
import { Type } from '../core/state/type/type';
import * as PokemonActions from '../core/state/pokemon/pokemon.actions';
import * as TypeActions from '../core/state/type/type.actions';
import { UrlHelperService } from '../core/services/url-helper.service';
import { selectAllPokemons } from '../core/state/pokemon/pokemon.reducer';
import { selectAllTypes } from '../core/state/type/type.reducer';

import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { HttpClient, HttpHeaders } from '@angular/common/http';

// loaded by script tag
declare var twttr: any;

@Component({
  selector: 'pkm-detail-view',
  templateUrl: './pokemon-detail.component.html',
  styleUrls: ['./pokemon-detail.component.scss']
})
export class PokemonDetailComponent implements OnInit, OnDestroy {
  private routeParamsSubscription: Subscription;
  private tweetsLoaded = false;
  public pokemon: Pokemon;
  public types$: Observable<Array<Type>>;
  public showReverse = false;

  constructor(private store: Store<AppState>,
    private urlService: UrlHelperService,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.types$ = this.store.select(selectAllTypes);
    this.routeParamsSubscription = this.activatedRoute.params.subscribe((params: Params) => {
      const routeId = parseInt(params['id'], 10);
      this.store.select(selectAllPokemons).subscribe((pokemons: Array<Pokemon>) => {
        this.pokemon = pokemons.find(p => p.id === routeId);
      });
      [
        new PokemonActions.GetPokemonTweets({ pokemonId: routeId, sinceId: null }),
        new PokemonActions.GetPokemonTypeRelations({ pokemonId: this.pokemon.id })
      ]
      .forEach((action: PokemonActions.All) => this.store.dispatch(action));

    });
  }

  public get typesForPokemon$(): Observable<Array<Type>> {
    return this.types$.map((types: Type[]) => {
      return types.filter((type: Type, index: number) => {
        return true || this.pokemon.types.some((pType: PokemonType) => {
          return pType.type.name === type.name;
        });
      });
    }
    );
  }

  public getAverageStatForType(types: Type[], typeName: string, statName: string): number {
    if (!types) {
      return -1;
    }
    const type = types.find(t => t.name === typeName);

    if (!type || !type.averageStats) {
      return -1;
    }
    const avgStat = type.averageStats.find(aS => aS.name === statName);
    if (!avgStat) {
      return -1;
    }
    return Math.round(avgStat.value);
  }

  public calculateAverageStats(type: PokemonType) {
    const typeId = this.urlService.getIdFromUrl(type.type.url);
    this.store.dispatch(new TypeActions.CalculateAverageStats({ typeId: typeId, typeName: type.type.name }));
  }

  ngOnDestroy() {
    this.routeParamsSubscription.unsubscribe();
  }
}
