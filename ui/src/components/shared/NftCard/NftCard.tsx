import './NftCard.css';

import { Nft } from '../../../types';

interface CardProps {
  identifier: string;
  collection: string;
  name: string;
  description: string;
  image_url: string;
  onClick?: (nft: Nft) => void;
}

function Card({
  identifier,
  collection,
  name,
  description,
  image_url,
  onClick,
}: CardProps) {
  const handleClick = () => {
    if (!onClick) return;

    onClick({ identifier, collection, name, description, image_url });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      if (!onClick) return;

      onClick({ identifier, collection, name, description, image_url });
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
