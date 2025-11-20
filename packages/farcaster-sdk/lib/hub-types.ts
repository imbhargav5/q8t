// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

export interface Cast {
  data?: { type?: string; fid?: number; timestamp?: number; network?: string; castAddBody?: { embedsDeprecated?: string[]; mentions?: number[]; parentCastId?: { fid?: number; hash?: string }; text?: string; mentionsPositions?: number[]; embeds?: Record<string, unknown>[] } };
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}

export interface CastsResponse {
  messages?: Cast[];
  nextPageToken?: string;
}

export interface Reaction {
  data?: { type?: string; fid?: number; timestamp?: number; network?: string; reactionBody?: { type?: "LIKE" | "RECAST"; targetCastId?: { fid?: number; hash?: string } } };
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}

export interface ReactionsResponse {
  messages?: Reaction[];
  nextPageToken?: string;
}

export interface Link {
  data?: { type?: string; fid?: number; timestamp?: number; network?: string; linkBody?: { type?: string; targetFid?: number } };
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}

export interface LinksResponse {
  messages?: Link[];
  nextPageToken?: string;
}

export interface UserData {
  data?: { type?: string; fid?: number; timestamp?: number; network?: string; userDataBody?: { type?: string; value?: string } };
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}

export interface UserDataResponse {
  messages?: UserData[];
  nextPageToken?: string;
}

export interface Verification {
  data?: { type?: string; fid?: number; timestamp?: number; network?: string; verificationAddEthAddressBody?: { address?: string; ethSignature?: string; blockHash?: string } };
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}

export interface VerificationsResponse {
  messages?: Verification[];
  nextPageToken?: string;
}

export interface UsernameProof {
  timestamp?: number;
  name?: string;
  owner?: string;
  signature?: string;
  fid?: number;
  type?: string;
}

export interface UsernameProofsResponse {
  proofs?: UsernameProof[];
}

export interface StorageLimits {
  limits?: { storeType?: string; name?: string; limit?: number; used?: number; earliestTimestamp?: number; earliestHash?: string }[];
}

export interface OnChainEvent {
  type?: string;
  chainId?: number;
  blockNumber?: number;
  blockHash?: string;
  blockTimestamp?: number;
  transactionHash?: string;
  logIndex?: number;
  fid?: number;
}

export interface OnChainEventsResponse {
  events?: OnChainEvent[];
  nextPageToken?: string;
}

export interface OnChainSigner {
  fid?: number;
  key?: string;
  keyType?: number;
  eventType?: string;
  metadata?: string;
}

export interface OnChainSignersResponse {
  events?: OnChainSigner[];
  nextPageToken?: string;
}

export interface HubInfo {
  version?: string;
  isSyncing?: boolean;
  nickname?: string;
  rootHash?: string;
  dbStats?: Record<string, unknown>;
}

export interface FidsResponse {
  fids?: number[];
  nextPageToken?: string;
}

export interface Message {
  data?: Record<string, unknown>;
  hash?: string;
  hashScheme?: string;
  signature?: string;
  signatureScheme?: string;
  signer?: string;
}
