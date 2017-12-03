import { autoserialize, autoserializeAs } from 'cerialize';

import { Tweet } from '../tweet/tweet';

export class PokemonType {
  @autoserialize slot: Number;
  @autoserialize type: {
    url: string;
    name: string;
  };
}

export class PokemonStat {
  @autoserialize baseStat: number;
  @autoserialize effort: number;
  @autoserialize stat: {
    name: string;
    url: string;
  };
}

export class Pokemon {
  // FROM GET_ALL_POKEMONS
  @autoserialize name: string;
  @autoserialize url: string;
  @autoserializeAs(Number) id: number;
  // FROM GET_POKEMON
  @autoserializeAs(Number) height: number;
  @autoserializeAs(Number) weight: number;
  @autoserialize sprites: any;
  @autoserializeAs(PokemonType) types: Array<PokemonType>;
  @autoserializeAs(PokemonStat) stats: Array<PokemonStat>;
  @autoserializeAs(Tweet) tweets: Array<Tweet>;
}
