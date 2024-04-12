import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateSessionInput {
  @Field({ nullable: true })
  id: string;
}
