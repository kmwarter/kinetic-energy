export interface Session {
  id: string;
  assets: Nft[] | null;
  created_at: string;
  updated_at: string;
}

export interface SessionData {
  session: Session;
}

export interface CreateResponse {
  createSession: SessionData['session'];
}

export interface UpdateResponse {
  updateSession: SessionData['session'];
}

export interface RemoveResponse {
  removeSession: SessionData['session'];
}

export interface AssetsData {
  assets: {
    collection: string;
    name: string;
    description: string;
    banner_image_url: string;
  }[];
}

export interface Nft {
  identifier: string;
  collection: string;
  name: string;
  description: string;
  image_url: string;
}

export interface NftsData {
  nfts: Nft[];
}
