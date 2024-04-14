import { Resolver, Query } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { Asset } from './entities/asset.entity';

@Resolver(() => Asset)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [Asset], { name: 'assets' })
  findAll() {
    return this.assetsService.collections();
  }
}
