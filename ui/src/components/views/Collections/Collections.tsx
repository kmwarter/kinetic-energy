import './Collections.css';

import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';

import Card from '../../shared/AssetCard/AssetCard';

interface AssetsData {
  assets: {
    collection: string;
    name: string;
    description: string;
    image_url: string;
    banner_image_url: string;
    owner: string;
    opensea_url: string;
  }[];
}

const assetsQuery = gql`
  query GetAssets {
    assets {
      collection
      name
      description
      image_url
      banner_image_url
      owner
      opensea_url
    }
  }
`;

function Collections() {
  const { isPending, isError, data, error } = useQuery<{
    assets: AssetsData['assets'] | null;
  }>({
    queryKey: ['assets'],
    queryFn: async () => {
      const { assets }: { assets: AssetsData['assets'] } = await request(
        'http://localhost:4000/graphql',
        assetsQuery,
      );

      return { assets };
    },
  });

  if (isPending) {
    return <div className="loading-container">Loading...</div>;
  }

  if (isError) {
    return <div className="loading-container">{error.message}</div>;
  }

  return (
    <div className="collections-container">
      {data?.assets?.map((asset) => {
        return <Card key={asset.collection} {...asset} />;
      })}
    </div>
  );
}

export default Collections;
