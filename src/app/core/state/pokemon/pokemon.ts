import { autoserialize, autoserializeAs } from 'cerialize';

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
  @autoserialize public name: string;
  @autoserialize url: string;
  @autoserializeAs(Number) public id: number;
  // FROM GET_POKEMON
  @autoserializeAs(Number) public height: number;
  @autoserializeAs(Number) public weight: number;
  @autoserialize public sprites: any;
  @autoserializeAs(PokemonType) public types: Array<PokemonType>;
  @autoserializeAs(PokemonStat) public stats: Array<PokemonStat>;
}
