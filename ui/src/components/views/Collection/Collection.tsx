import './Collection.css';

import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { useParams } from 'react-router-dom';

import Card from './Card/Card';

interface NftsData {
  nfts: {
    identifier: string;
    collection: string;
    name: string;
    description: string;
    image_url: string;
  }[];
}

const nftsQuery = gql`
  query GetNfts($slug: String!) {
    nfts(collection_slug: $slug) {
      identifier
      collection
      name
      description
      image_url
    }
  }
`;

function Collection() {
  const { slug } = useParams();
  const { isPending, isError, data, error } = useQuery<{
    nfts: NftsData['nfts'] | null;
  }>({
    queryKey: ['nfts'],
    queryFn: async () => {
      const { nfts }: { nfts: NftsData['nfts'] } = await request(
        'http://localhost:4000/graphql',
        nftsQuery,
        { slug },
      );

      return { nfts };
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
      {data?.nfts?.map((nft) => {
        return <Card key={nft.collection} {...nft} />;
      })}
    </div>
  );
}

export default Collection;
