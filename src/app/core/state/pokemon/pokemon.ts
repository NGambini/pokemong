import { autoserialize, autoserializeAs } from 'cerialize';

export class Pokemon {
  @autoserializeAs(Number) public id: number;
  @autoserializeAs(Number) public height: number;
  @autoserializeAs(Number) public weight: number;
  @autoserializeAs(Number) public name: number;
  @autoserialize public sprites: any;
}
