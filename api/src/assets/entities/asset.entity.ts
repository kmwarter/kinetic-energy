import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Asset {
  @Field()
  collection: string;

  @Field({ nullable: true })
  name: string;

  @Field({ nullable: true })
  description: string;

  @Field({ nullable: true })
  banner_image_url: string;
}
