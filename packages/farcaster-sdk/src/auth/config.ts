// Configuration types and constants for Farcaster SDK

// ============= Hub API Configuration =============

export interface HubConfig {
  /** Hub URL (e.g., https://hub.pinata.cloud) */
  hubUrl?: string;
  /** Ed25519 private key for signing messages (hex string with 0x prefix) */
  signerPrivateKey?: string;
  /** FID (Farcaster ID) associated with the signer */
  fid?: number;
}

export const DEFAULT_HUB_URL = "https://hub.pinata.cloud";
export const HUB_HTTP_PORT = 2281;
export const HUB_GRPC_PORT = 2283;

// ============= Warpcast API Configuration =============

export interface WarpcastConfig {
  /** API key or access token for Warpcast API */
  accessToken: string;
  /** Base URL for Warpcast API */
  baseUrl?: string;
  /** Callback when token is refreshed */
  onTokenRefresh?: (newToken: string) => void;
}

export const WARPCAST_API_BASE_URL = "https://api.warpcast.com";
export const FARCASTER_CLIENT_API_BASE_URL = "https://api.farcaster.xyz";

// ============= Signer API Configuration =============

export interface SignerConfig {
  /** App FID (Farcaster ID) for the application */
  appFid: number;
  /** Ed25519 private key for signing signer requests */
  appPrivateKey: string;
  /** Base URL for signer API */
  baseUrl?: string;
}

export const SIGNER_API_BASE_URL = "https://api.warpcast.com";

// ============= OAuth2 / Auth Configuration =============

export interface FarcasterAuthConfig {
  /** App FID */
  appFid: number;
  /** App private key for signing */
  appPrivateKey: string;
  /** Public key (derived from private key) */
  publicKey?: string;
  /** Deadline for signer request (Unix timestamp in seconds) */
  deadline?: number;
}

// ============= Main SDK Configuration =============

export interface FarcasterSDKConfig {
  /** Hub API configuration */
  hub?: HubConfig;
  /** Warpcast API configuration */
  warpcast?: WarpcastConfig;
  /** Signer API configuration */
  signer?: SignerConfig;
}

// ============= HTTP Client Interface =============

export interface HttpClient {
  get<T>(path: string, params?: Record<string, string | number | boolean | undefined>): Promise<T>;
  post<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  put<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  delete<T>(
    path: string,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
  patch<T>(
    path: string,
    body?: unknown,
    params?: Record<string, string | number | boolean | undefined>,
  ): Promise<T>;
}
