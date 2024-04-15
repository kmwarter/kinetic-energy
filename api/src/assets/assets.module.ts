import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AssetsService } from './assets.service';
import { AssetsResolver } from './assets.resolver';
import { Nft } from './entities/nft.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Nft])],
  providers: [AssetsResolver, AssetsService],
  exports: [AssetsService],
})
export class AssetsModule {}
