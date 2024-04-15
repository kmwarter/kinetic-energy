import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Nft {
  @Field()
  identifier: string;

  @Field()
  collection: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image_url: string;
}
