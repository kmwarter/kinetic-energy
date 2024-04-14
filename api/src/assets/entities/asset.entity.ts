import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Asset {
  @Field()
  collection: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  image_url: string;

  @Field()
  banner_image_url: string;

  @Field()
  owner: string;

  @Field({ nullable: true })
  opensea_url: string | null;
}
