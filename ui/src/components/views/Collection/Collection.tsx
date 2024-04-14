import './Collection.css';

import { useQuery } from '@tanstack/react-query';
import { gql, request } from 'graphql-request';
import { useParams } from 'react-router-dom';

import { Session } from '../../../types';
import NftCard from '../../shared/NftCard/NftCard';

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

interface CellectionProps {
  session?: Session | null;
  createSession: () => Promise<Session>;
  updateSession: (id: string, assetIds: string[]) => void;
}

function Collection({ session, createSession, updateSession }: CellectionProps) {
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

  const onNftClick = async (identifier: string) => {
    let sessionId = session?.id;
    if (!sessionId) {
      const newSession = await createSession();
      sessionId = newSession.id;
    }

    // TODO: Implement add to cart through update session
  };

  if (isPending) {
    return <div className="loading-container">Loading...</div>;
  }

  if (isError) {
    return <div className="loading-container">{error.message}</div>;
  }

  return (
    <div className="collections-container">
      {data?.nfts?.map((nft) => {
        return <NftCard key={nft.collection} {...nft} onClick={onNftClick} />;
      })}
    </div>
  );
}

export default Collection;
