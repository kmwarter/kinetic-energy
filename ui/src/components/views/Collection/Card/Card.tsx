import './Card.css';

interface CardProps {
  identifier: string;
  collection: string;
  name: string;
  description: string;
  image_url: string;
}

function Card({ identifier, collection, name, description, image_url }: CardProps) {
  const handleClick = () => {
    console.log(identifier);
    // TODO: Add to cart
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      // TODO: Add to cart
    }
  };

  return (
    <div
      onClick={handleClick}
      className="asset-card"
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img alt="collection-pic" src={image_url || '/money.png'} />
      <div className="asset-card-name">{name}</div>
      <div className="asset-card-collection">{collection}</div>
      <div className="asset-card-description">{description}</div>
    </div>
  );
}

export default Card;
