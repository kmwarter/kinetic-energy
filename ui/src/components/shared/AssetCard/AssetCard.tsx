import './AssetCard.css';

import { Link } from 'react-router-dom';

interface AssetCardProps {
  collection: string;
  name: string;
  description: string;
  image_url: string;
  banner_image_url: string;
  owner: string;
  opensea_url: string;
}

function AssetCard({ name, description, banner_image_url, opensea_url }: AssetCardProps) {

  return (
    <Link to={opensea_url} className="asset-card">
      <img alt="collection-pic" src={banner_image_url || '/money.png'} />
      <div className="asset-card-name">{name}</div>
      <div className="asset-card-description">{description}</div>
    </Link>
  );
}

export default AssetCard;
