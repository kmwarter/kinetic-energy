import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';

@Injectable()
export class AssetsService {
  private readonly openSeaUrlV2: (route: string, params?: string) => string;
  private readonly axiosConfig: { headers: { 'x-api-key': string } };

  constructor(private readonly configService: ConfigService) {
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

  async collections() {
    console.log((
      await axios.get(this.openSeaUrlV2('/collections'), this.axiosConfig)
    ).data.collections)
    return (
      await axios.get(this.openSeaUrlV2('/collections'), this.axiosConfig)
    ).data.collections;
  }
}
