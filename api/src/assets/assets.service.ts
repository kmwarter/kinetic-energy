import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Nft } from '../assets/entities/nft.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateNftInput } from './dto/create-nft.input';
import axios from 'axios';

@Injectable()
export class AssetsService {
  private readonly openSeaUrlV2: (route: string, params?: string) => string;
  private readonly axiosConfig: { headers: { 'x-api-key': string } };

  constructor(
    private readonly configService: ConfigService,
    @InjectRepository(Nft)
    private nftRepository: Repository<Nft>,
  ) {
    const OPEN_SEA_BASE_URL =
      configService.get<string>('OPEN_SEA_BASE_URL') || '';
    const OPEN_SEA_API_KEY =
      configService.get<string>('OPEN_SEA_API_KEY') || '';

    this.openSeaUrlV2 = (route: string, params?: string) =>
      `${OPEN_SEA_BASE_URL}/api/v2${route}?${params ? `${params}` : ''}`;
    this.axiosConfig = {
      headers: {
        'x-api-key': OPEN_SEA_API_KEY,
      },
    };
  }

  create(createNftInput: CreateNftInput): Promise<Nft> {
    const nft = this.nftRepository.create(createNftInput);
    return this.nftRepository.save(nft);
  }

  // async remove(id: string): Promise<Nft> {
  //   const nft = await this.findOne(id);

  //   if (nft) {
  //     await this.nftRepository.delete(id);
  //   } else {
  //     throw new Error('The supplied nft id does not exist');
  //   }

  //   return nft;
  // }

  async collections() {
    // return (
    //   await axios.get(this.openSeaUrlV2('/collections'), this.axiosConfig)
    // ).data.collections;
    // test
    return [
      {
        collection: 'test-collection-slug',
        name: 'Test Collection Title!',
        description: 'Test collection description.',
        banner_image_url: 'http://test-collection-banner-image-url.com/test',
      },
    ];
  }

  async collection(collectionSlug: string) {
    // return (
    //   await axios.get(
    //     this.openSeaUrlV2(`/collection/${collectionSlug}/nfts`),
    //     this.axiosConfig,
    //   )
    // ).data.nfts;
    // test
    return [
      {
        identifier: 'test-identifier',
        collection: 'test-slug',
        name: 'Test Asset Name',
        description: 'Test asset description.',
        image_url: 'http://test-asset-banner-image-url.com/test',
      },
    ];
  }

  // async collection(identifiers: string[]) {
  //   return await Promise.all(identifiers.map((id) => {
  //     return axios.get(
  //       this.openSeaUrlV2(`/collection/${collectionSlug}/nfts`),
  //       this.axiosConfig,
  //     );
  //   }))
  // }
}
