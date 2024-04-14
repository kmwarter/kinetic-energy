import './Navbar.css';

function Navbar() {
  return (
    <div className="nav">
      <div className="cart-icon-container">
        <div className="item-number">{1}</div>
        <img className="cart-icon" alt="cart-icon" src="/cart-icon.png" />
      </div>
    </div>
  );
}

export default Navbar;
