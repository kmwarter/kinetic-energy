import { Session } from '../../../types';

interface CartProps {
  session?: Session | null;
  updateSession: (id: string, assetIds: string[]) => void;
  removeSession: () => void;
}

function Cart({ session, updateSession, removeSession }: CartProps) {
  // TODO: take session and use it to submit the final order
  // Also allow remove from cart through update cart

  return <div>Cart</div>;
}

export default Cart;
