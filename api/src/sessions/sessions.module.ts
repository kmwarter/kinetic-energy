import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SessionsService } from './sessions.service';
import { SessionsResolver } from './sessions.resolver';
import { Session } from './entities/session.entity';
import { AssetsModule } from '../assets/assets.module';

@Module({
  imports: [TypeOrmModule.forFeature([Session]), AssetsModule],
  providers: [SessionsResolver, SessionsService],
})
export class SessionsModule {}
