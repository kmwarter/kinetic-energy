import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateNftInput {
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
