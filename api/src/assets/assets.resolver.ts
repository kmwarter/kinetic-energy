import { Resolver, Query, Args } from '@nestjs/graphql';
import { AssetsService } from './assets.service';
import { Asset } from './entities/asset.entity';
import { CollectionNft } from './entities/collectionnft.entity';

@Resolver(() => Asset)
@Resolver(() => CollectionNft)
export class AssetsResolver {
  constructor(private readonly assetsService: AssetsService) {}

  @Query(() => [Asset], { name: 'assets' })
  findAll() {
    return this.assetsService.collections();
  }

  @Query(() => [CollectionNft], { name: 'nfts' })
  findNfts(
    @Args('collection_slug', { type: () => String }) collection_slug: string,
  ) {
    return this.assetsService.collection(collection_slug);
  }

  // @Query(() => [Nft], { name: 'nftsByIdentifiers' })
  // findNftsByIdentifiers(
  //   @Args('identifiers', { type: () => String[] }) identifiers: string[],
  // ) {
  //   return this.assetsService.nfts(identifiers);
  // }
}
