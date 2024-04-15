import { Injectable } from '@nestjs/common';
import { CreateSessionInput } from './dto/create-session.input';
import { UpdateSessionInput } from './dto/update-session.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Session } from './entities/session.entity';
// TODO: If going with the relation approach I will need extra logic for adding nfts to the Nft table
// import { Nft } from '../assets/entities/nft.entity';
// import { AssetsService } from '../assets/assets.service';

@Injectable()
export class SessionsService {
  constructor(
    @InjectRepository(Session)
    private sessionsRepository: Repository<Session>,
    // private assetsService: AssetsService,
  ) {}

  create(createSessionInput: CreateSessionInput): Promise<Session> {
    const session = this.sessionsRepository.create(createSessionInput);
    return this.sessionsRepository.save(session);
  }

  findAll(): Promise<Session[]> {
    return this.sessionsRepository.find();
  }

  findOne(id: string): Promise<Session | null> {
    return this.sessionsRepository.findOneBy({ id });
  }

  async update(
    id: string,
    updateSessionInput: UpdateSessionInput,
  ): Promise<Session> {
    const session = await this.findOne(id);

    Object.assign(session, updateSessionInput);
    return this.sessionsRepository.save(session);
  }

  async remove(id: string): Promise<Session> {
    const session = await this.findOne(id);

    if (session) {
      await this.sessionsRepository.delete(id);
    } else {
      throw new Error('The supplied session id does not exist');
    }

    return session;
  }
}
