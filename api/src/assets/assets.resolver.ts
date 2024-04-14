import { Resolver, Query, Args } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { Asset } from './entities/asset.entity';
import { Nft } from './entities/nft.entity';

@Resolver(() => Asset)
@Resolver(() => Nft)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [Asset], { name: 'assets' })
  findAll() {
    return this.assetsService.collections();
  }

  @Query(() => [Nft], { name: 'nfts' })
  findNfts(
    @Args('collection_slug', { type: () => String }) collection_slug: string,
  ) {
    return this.assetsService.collection(collection_slug);
  }
}
