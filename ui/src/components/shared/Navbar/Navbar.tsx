import './Navbar.css';

import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <div className="nav">
      <div className="cart-icon-container">
        <div className="item-number">{1}</div>
        <Link to="/cart">
          <img className="cart-icon" alt="cart-icon" src="/cart-icon.png" />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
