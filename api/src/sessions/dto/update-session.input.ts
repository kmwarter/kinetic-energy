import { CreateSessionInput } from './create-session.input';
import { InputType, Field, PartialType } from '@nestjs/graphql';
import { CreateNftInput } from '../../assets/dto/create-nft.input';

@InputType()
export class UpdateSessionInput extends PartialType(CreateSessionInput) {
  @Field()
  id: string;

  @Field(() => [CreateNftInput])
  assets: CreateNftInput[];
}
