import { CreateSessionInput } from './create-session.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field()
  id: string;

  @Field(() => [String])
  assetIds: string[];
}
