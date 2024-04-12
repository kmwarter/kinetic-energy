import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { SessionsService } from './sessions.service';
import { Session } from './entities/session.entity';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';

@Resolver(() => Session)
export class SessionsResolver {
  constructor(private readonly sessionsService: SessionsService) {}

  @Mutation(() => Session)
  createSession(
    @Args('createSessionInput', { nullable: true })
    createSessionInput?: CreateSessionInput,
  ) {
    return this.sessionsService.create(createSessionInput);
  }

  @Query(() => [Session], { name: 'sessions' })
  findAll() {
    return this.sessionsService.findAll();
  }

  @Query(() => Session, { name: 'session', nullable: true })
  findOne(@Args('id') id: string) {
    return this.sessionsService.findOne(id);
  }

  @Mutation(() => Session)
  updateSession(
    @Args('updateSessionInput') updateSessionInput: UpdateSessionInput,
  ) {
    return this.sessionsService.update(
      updateSessionInput.id,
      updateSessionInput,
    );
  }

  @Mutation(() => Session)
  removeSession(@Args('id') id: string) {
    return this.sessionsService.remove(id);
  }
}
