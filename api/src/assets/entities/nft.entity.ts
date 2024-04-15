import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Nft {
  @Field()
  identifier: string;

  @Field()
  collection: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  image_url: string;

  @Field({ nullable: true })
  sessionId: string;
}
