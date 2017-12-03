import { autoserializeAs, autoserialize } from 'cerialize';

export class TweetUser {
  @autoserializeAs(Number) public id: number;
  @autoserialize public id_str: string;
  @autoserialize public name: string;
  @autoserialize public profileImageUrl: string;
  @autoserialize public location: string;
}

export class Tweet {
  @autoserializeAs(Number) public id: number;
  @autoserialize public id_str: string;
  @autoserialize public createdAt: string;
  @autoserialize public text: string;
  @autoserializeAs(TweetUser) public user: TweetUser;
}
