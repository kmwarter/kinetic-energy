import './Navbar.css';

import { Link } from 'react-router-dom';

import { Session } from '../../../types';

interface NavbarProps {
  session?: Session | null;
  onCartClick: () => void;
}

function Navbar({ session, onCartClick }: NavbarProps) {
  return (
    <div className="nav">
      <Link to="/" className="nav-home">
        Collections
      </Link>
      <div className="nav-right">
        <div
          onClick={onCartClick}
          className="cart-icon-container"
          onKeyDown={onCartClick}
          role="button"
          tabIndex={0}
        >
          <div
            className="item-number"
            style={{ display: session?.assets?.length ? 'flex' : 'none' }}
          >
            {session?.assets?.length}
          </div>
          <img className="cart-icon" alt="cart-icon" src="/cart-icon.png" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;
