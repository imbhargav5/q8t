import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useApi, useMutation } from "@/hooks/use-api"
import * as accountsApi from "@/lib/api/accounts"
import type { Account } from "@/lib/api/types"
import {
  CheckCircle2,
  XCircle,
  RefreshCw,
  Trash2,
  Plus,
  Shield,
} from "lucide-react"
import { useState } from "react"
import { toast } from "sonner"

export function XSettings() {
  const { data: accounts, loading, refetch } = useApi(
    () => accountsApi.listAccounts(),
    []
  )

  const xAccounts = accounts?.filter((a) => a.platform === "x") ?? []

  return (
    <div className="space-y-6">
      <ConnectedAccounts accounts={xAccounts} loading={loading} onRefresh={refetch} />
      <AddAccountCard onAdded={refetch} />
    </div>
  )
}

function ConnectedAccounts({
  accounts,
  loading,
  onRefresh,
}: {
  accounts: Account[]
  loading: boolean
  onRefresh: () => void
}) {
  if (loading) {
    return (
      <Card>
        <CardContent className="py-8 text-center text-muted-foreground">
          Loading accounts...
        </CardContent>
      </Card>
    )
  }

  if (accounts.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>X (Twitter) Accounts</CardTitle>
          <CardDescription>
            No X accounts connected. Add your Bearer Token below to get started.
          </CardDescription>
        </CardHeader>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Connected X Accounts</CardTitle>
        <CardDescription>
          Manage your X (Twitter) account connections
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        {accounts.map((account) => (
          <AccountRow key={account.id} account={account} onUpdate={onRefresh} />
        ))}
      </CardContent>
    </Card>
  )
}

function AccountRow({
  account,
  onUpdate,
}: {
  account: Account
  onUpdate: () => void
}) {
  const [isVerifying, setIsVerifying] = useState(false)
  const [isRemoving, setIsRemoving] = useState(false)

  const handleVerify = async () => {
    setIsVerifying(true)
    try {
      const result = await accountsApi.verifyAccount(account.id)
      if (result.valid) {
        toast.success(`Verified as @${result.username}`)
      } else {
        toast.error(`Verification failed: ${result.error}`)
      }
      onUpdate()
    } catch (e) {
      toast.error(`Error: ${e}`)
    } finally {
      setIsVerifying(false)
    }
  }

  const handleRemove = async () => {
    setIsRemoving(true)
    try {
      await accountsApi.removeAccount(account.id)
      toast.success("Account removed")
      onUpdate()
    } catch (e) {
      toast.error(`Error: ${e}`)
    } finally {
      setIsRemoving(false)
    }
  }

  return (
    <div className="flex items-center justify-between rounded-lg border p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white text-lg font-bold">
          𝕏
        </div>
        <div>
          <div className="flex items-center gap-2">
            <p className="text-sm font-medium">
              {account.platform_username
                ? `@${account.platform_username}`
                : account.label || "X Account"}
            </p>
            {account.verified_at ? (
              <Badge variant="outline" className="gap-1 text-green-600 border-green-200">
                <CheckCircle2 className="h-3 w-3" />
                Verified
              </Badge>
            ) : (
              <Badge variant="outline" className="gap-1 text-yellow-600 border-yellow-200">
                <Shield className="h-3 w-3" />
                Unverified
              </Badge>
            )}
          </div>
          {account.platform_user_id && (
            <p className="text-xs text-muted-foreground">
              ID: {account.platform_user_id}
            </p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={handleVerify}
          disabled={isVerifying}
        >
          <RefreshCw className={`h-4 w-4 mr-1 ${isVerifying ? "animate-spin" : ""}`} />
          Verify
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={handleRemove}
          disabled={isRemoving}
          className="text-destructive hover:text-destructive"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}

function AddAccountCard({ onAdded }: { onAdded: () => void }) {
  const [token, setToken] = useState("")
  const [label, setLabel] = useState("")
  const [isAdding, setIsAdding] = useState(false)

  const handleAdd = async () => {
    if (!token.trim()) {
      toast.error("Bearer token is required")
      return
    }

    setIsAdding(true)
    try {
      const account = await accountsApi.addAccount({
        platform: "x",
        bearer_token: token.trim(),
        label: label.trim() || undefined,
      })
      toast.success(
        account.platform_username
          ? `Connected as @${account.platform_username}`
          : "Account added successfully"
      )
      setToken("")
      setLabel("")
      onAdded()
    } catch (e) {
      toast.error(`Failed to add account: ${e}`)
    } finally {
      setIsAdding(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Plus className="h-5 w-5" />
          Add X Account
        </CardTitle>
        <CardDescription>
          Enter your X API Bearer Token. You can get one from the{" "}
          <span className="font-medium">X Developer Portal</span>. Your token is
          encrypted and stored locally.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="bearer-token">Bearer Token</Label>
          <Input
            id="bearer-token"
            type="password"
            placeholder="Enter your X API Bearer Token"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleAdd()}
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="account-label">Label (optional)</Label>
          <Input
            id="account-label"
            placeholder="e.g., Personal, Business"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
          />
        </div>
        <Separator />
        <Button onClick={handleAdd} disabled={isAdding || !token.trim()}>
          {isAdding ? "Connecting..." : "Connect Account"}
        </Button>
      </CardContent>
    </Card>
  )
}
