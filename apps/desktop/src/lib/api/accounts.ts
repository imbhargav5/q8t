import { invoke } from "@tauri-apps/api/core"
import type { Account, VerifyResult } from "./types"

export async function listAccounts(): Promise<Account[]> {
  return invoke<Account[]>("list_accounts")
}

export async function addAccount(payload: {
  platform: string
  label?: string
  bearer_token?: string
  api_key?: string
}): Promise<Account> {
  return invoke<Account>("add_account", { payload })
}

export async function removeAccount(id: string): Promise<boolean> {
  return invoke<boolean>("remove_account", { id })
}

export async function verifyAccount(id: string): Promise<VerifyResult> {
  return invoke<VerifyResult>("verify_account", { id })
}
