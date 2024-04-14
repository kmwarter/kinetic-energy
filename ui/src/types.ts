export interface Session {
  id: string;
  assetIds: string[];
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
