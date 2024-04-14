import './Navbar.css';

import { Link } from 'react-router-dom';

import { Session } from '../../../types';

interface NavbarProps {
  session?: Session | null;
}

function Navbar({ session }: NavbarProps) {
  return (
    <div className="nav">
      <div className="cart-icon-container">
        <div className="item-number">{session?.assetIds.length}</div>
        <Link to="/cart">
          <img className="cart-icon" alt="cart-icon" src="/cart-icon.png" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
