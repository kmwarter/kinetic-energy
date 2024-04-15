import './Cart.css';

// import { nftsByIdentifiersQuery } from '../../../gql';
import { Session } from '../../../types';
// import { NftsData } from '../../../types';

interface CartProps {
  open: boolean;
  session?: Session | null;
  updateSession: (assetIds: string[]) => void;
  removeSession: () => void;
  onCloseClick: () => void;
}

function Cart({ open, session, updateSession, removeSession, onCloseClick }: CartProps) {
  // use product ids in session to fetch all of the nft data
  // TODO: This is too inefficient to keep querying this so look into holding all nft data instead of just ids on session via a cart table
  // TODO: take session and use it to submit the final order
  // Also allow remove from cart through update cart
  // const { isPending, isError, data, error } = useQuery<{
  //   nfts: NftsData['nfts'] | null;
  // }>({
  //   queryKey: ['nfts'],
  //   queryFn: async () => {
  //     if (!session) return;

  //     const { nfts }: { nfts: NftsData['nfts'] } = await request(
  //       'http://localhost:4000/graphql',
  //       nftsByIdentifiersQuery,
  //       { identifiers: session.assetIds },
  //     );

  //     return { nfts };
  //   },
  // });

  return (
    <div className="cart" style={{ display: open ? 'flex' : 'none' }}>
      <div
        onClick={onCloseClick}
        className="close-button"
        onKeyDown={onCloseClick}
        role="button"
        tabIndex={0}
      >
        X
      </div>
    </div>
  );
}

export default Cart;
