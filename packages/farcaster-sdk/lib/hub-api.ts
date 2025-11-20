// AUTO-GENERATED FILE - DO NOT EDIT
// Generated from OpenAPI specification

import type { HttpClient } from "../src/auth/config";
import type * as HubTypes from "./hub-types";

export class HubApi {
  private client: HttpClient;

  constructor(client: HttpClient) {
    this.client = client;
  }

  /**
   * Get casts by FID
   */
  async getCastsByFid(params?: { fid?: number; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.CastsResponse> {
    return this.client.get<HubTypes.CastsResponse>("/castsByFid", {
      "fid": params?.fid,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get casts by parent
   */
  async getCastsByParent(params?: { fid?: number; hash?: string; url?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.CastsResponse> {
    return this.client.get<HubTypes.CastsResponse>("/castsByParent", {
      "fid": params?.fid,
      "hash": params?.hash,
      "url": params?.url,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get casts by mention
   */
  async getCastsByMention(params?: { fid?: number; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.CastsResponse> {
    return this.client.get<HubTypes.CastsResponse>("/castsByMention", {
      "fid": params?.fid,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get cast by ID
   */
  async getCastById(params?: { fid?: number; hash?: string }): Promise<HubTypes.Cast> {
    return this.client.get<HubTypes.Cast>("/castById", {
      "fid": params?.fid,
      "hash": params?.hash,
    });
  }

  /**
   * Get reactions by FID
   */
  async getReactionsByFid(params?: { fid?: number; reaction_type?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.ReactionsResponse> {
    return this.client.get<HubTypes.ReactionsResponse>("/reactionsByFid", {
      "fid": params?.fid,
      "reaction_type": params?.reaction_type,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get reactions to a cast
   */
  async getReactionsByCast(params?: { target_fid?: number; target_hash?: string; reaction_type?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.ReactionsResponse> {
    return this.client.get<HubTypes.ReactionsResponse>("/reactionsByCast", {
      "target_fid": params?.target_fid,
      "target_hash": params?.target_hash,
      "reaction_type": params?.reaction_type,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get reaction by ID
   */
  async getReactionById(params?: { fid?: number; target_fid?: number; target_hash?: string; reaction_type?: string }): Promise<HubTypes.Reaction> {
    return this.client.get<HubTypes.Reaction>("/reactionById", {
      "fid": params?.fid,
      "target_fid": params?.target_fid,
      "target_hash": params?.target_hash,
      "reaction_type": params?.reaction_type,
    });
  }

  /**
   * Get links by FID
   */
  async getLinksByFid(params?: { fid?: number; link_type?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.LinksResponse> {
    return this.client.get<HubTypes.LinksResponse>("/linksByFid", {
      "fid": params?.fid,
      "link_type": params?.link_type,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get links to a target FID
   */
  async getLinksByTargetFid(params?: { target_fid?: number; link_type?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.LinksResponse> {
    return this.client.get<HubTypes.LinksResponse>("/linksByTargetFid", {
      "target_fid": params?.target_fid,
      "link_type": params?.link_type,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get link by ID
   */
  async getLinkById(params?: { fid?: number; target_fid?: number; link_type?: string }): Promise<HubTypes.Link> {
    return this.client.get<HubTypes.Link>("/linkById", {
      "fid": params?.fid,
      "target_fid": params?.target_fid,
      "link_type": params?.link_type,
    });
  }

  /**
   * Get user data by FID
   */
  async getUserDataByFid(params?: { fid?: number; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.UserDataResponse> {
    return this.client.get<HubTypes.UserDataResponse>("/userDataByFid", {
      "fid": params?.fid,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get verifications by FID
   */
  async getVerificationsByFid(params?: { fid?: number; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.VerificationsResponse> {
    return this.client.get<HubTypes.VerificationsResponse>("/verificationsByFid", {
      "fid": params?.fid,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get username proofs by FID
   */
  async getUsernameProofsByFid(params?: { fid?: number }): Promise<HubTypes.UsernameProofsResponse> {
    return this.client.get<HubTypes.UsernameProofsResponse>("/userNameProofsByFid", {
      "fid": params?.fid,
    });
  }

  /**
   * Get storage limits by FID
   */
  async getStorageLimitsByFid(params?: { fid?: number }): Promise<HubTypes.StorageLimits> {
    return this.client.get<HubTypes.StorageLimits>("/storageLimitsByFid", {
      "fid": params?.fid,
    });
  }

  /**
   * Get onchain events by FID
   */
  async getOnChainEventsByFid(params?: { fid?: number; event_type?: string; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.OnChainEventsResponse> {
    return this.client.get<HubTypes.OnChainEventsResponse>("/onChainEventsByFid", {
      "fid": params?.fid,
      "event_type": params?.event_type,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get onchain signers by FID
   */
  async getOnChainSignersByFid(params?: { fid?: number; pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.OnChainSignersResponse> {
    return this.client.get<HubTypes.OnChainSignersResponse>("/onChainSignersByFid", {
      "fid": params?.fid,
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Get hub info
   */
  async getInfo(params?: { dbstats?: boolean }): Promise<HubTypes.HubInfo> {
    return this.client.get<HubTypes.HubInfo>("/info", {
      "dbstats": params?.dbstats,
    });
  }

  /**
   * Get FIDs
   */
  async getFids(params?: { pageSize?: number; reverse?: boolean; pageToken?: string }): Promise<HubTypes.FidsResponse> {
    return this.client.get<HubTypes.FidsResponse>("/fids", {
      "pageSize": params?.pageSize,
      "reverse": params?.reverse,
      "pageToken": params?.pageToken,
    });
  }

  /**
   * Submit a signed message
   */
  async submitMessage(body: unknown): Promise<HubTypes.Message> {
    return this.client.post<HubTypes.Message>("/submitMessage", body);
  }

}