import './Cart.css';

import { Session } from '../../../types';
import { Nft } from '../../../types';
import NftCard from '../../shared/NftCard/NftCard';

interface CartProps {
  open: boolean;
  session?: Session | null;
  updateSession: (id: string, assets: Nft[]) => void;
  removeSession: () => void;
  onCloseClick: () => void;
}

function Cart({ open, session, updateSession, removeSession, onCloseClick }: CartProps) {
  // TODO: take session and use it to submit the final order
  // Upon submission we will call the removeSession function to delete this session and convert it to an order
  
  const onRemoveClick = async (identifier: string) => {
    if (!session) return;

    const newAssets = [...(session?.assets ? session.assets : [])].filter((asset) => asset.identifier !== identifier);

    updateSession(session.id, newAssets);
  }

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
      <div className="card-container">
        {session?.assets?.map((asset) => {
          return <NftCard key={asset.name} {...asset} onRemoveClick={onRemoveClick} />;
        })}
      </div>
    </div>
  );
}

export default Cart;
