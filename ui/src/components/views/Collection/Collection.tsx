import './Collection.css';

import { useQuery } from '@tanstack/react-query';
import { request } from 'graphql-request';
import { useParams } from 'react-router-dom';

import { nftsQuery } from '../../../gql';
import { Session } from '../../../types';
import { NftsData } from '../../../types';
import NftCard from '../../shared/NftCard/NftCard';

interface CellectionProps {
  session?: Session | null;
  createSession: () => Promise<Session>;
  updateSession: (id: string, assetIds: string[]) => void;
  openCart: () => void;
}

function Collection({
  session,
  createSession,
  updateSession,
  openCart,
}: CellectionProps) {
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
    try {
      let currentSession = session;
      if (!session?.id) {
        const newSession = await createSession();
        currentSession = newSession;
      }

      if (!currentSession) {
        console.error(
          'There was an issue creating the session so that nft could be added to cart.',
        );

        return;
      }

      if (currentSession.assetIds.includes(identifier)) {
        // TODO: Make an app level error banner so the user can be notified of errors.
        // Since Nfts are unique I assume you can not buy the same one twice?

        return;
      }

      const newAssetIds = [...currentSession.assetIds, identifier];
      updateSession(currentSession.id, newAssetIds);
      openCart();
    } catch (error) {
      console.error('Error adding nft:', error);
    }
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
