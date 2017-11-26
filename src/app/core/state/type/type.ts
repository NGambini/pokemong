import { autoserialize, autoserializeAs } from 'cerialize';

export class TypePokemon {
  @autoserialize slot: Number;
  @autoserialize pokemon: {
    url: string;
    name: string;
  };
}

export class Type {
  @autoserializeAs(Number) id: number;
  @autoserialize name: string;
  @autoserializeAs(TypePokemon) pokemon: Array<TypePokemon>;
}
