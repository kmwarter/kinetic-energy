import './CollectionCard.css';

import { useNavigate } from 'react-router-dom';

interface CardProps {
  collection: string;
  name: string;
  description: string;
  banner_image_url: string;
}

function CollectionCard({ collection, name, description, banner_image_url }: CardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/collection/${collection}`);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Enter' || event.key === ' ') {
      navigate(`/collection/${collection}`);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="collection-card"
      onKeyDown={handleKeyDown}
      role="button"
      tabIndex={0}
    >
      <img alt="collection-pic" src={banner_image_url || '/money.png'} />
      <div className="collection-card-name">{name}</div>
      <div className="collection-card-description">{description}</div>
    </div>
  );
}

export default CollectionCard;
