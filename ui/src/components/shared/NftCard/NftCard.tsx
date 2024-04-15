import './NftCard.css';

import { Nft } from '../../../types';

interface CardProps {
  identifier: string;
  collection: string;
  name: string;
  description: string;
  image_url: string;
  onClick?: (nft: Nft) => void;
  onRemoveClick?: (identifier: string) => void;
}

function NftCard({
  identifier,
  collection,
  name,
  description,
  image_url,
  onClick,
  onRemoveClick,
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

  const onRemoveButtonClick = () => {
    if (!onRemoveClick) return;

    onRemoveClick(identifier);
  }

  return (
    <div
      onClick={handleClick}
      className="nft-card"
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      {onRemoveClick && <div onClick={onRemoveButtonClick} className="remove-button">X</div>}
      <img className="nft-card-image" alt="collection-pic" src={image_url || '/money.png'} />
      <div className="nft-card-name">{name}</div>
      <div className="nft-card-collection">{collection}</div>
      <div className="nft-card-description">{description}</div>
    </div>
  );
}

export default NftCard;
