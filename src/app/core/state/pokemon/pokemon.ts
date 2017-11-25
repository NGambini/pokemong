import { autoserialize, autoserializeAs } from 'cerialize';

export class Pokemon {
  // FROM GET_ALL_POKEMONS
  @autoserialize public name: string;
  @autoserialize url: string;
  // FROM GET_POKEMON
  @autoserializeAs(Number) public id: number;
  @autoserializeAs(Number) public height: number;
  @autoserializeAs(Number) public weight: number;
  @autoserialize public sprites: any;
}
