"use client";

import type { ProviderDefinition } from "@/lib/zod-schemas";
import { ProviderCard } from "./provider-card";

interface ProviderListProps {
  providers: ProviderDefinition[];
}

export function ProviderList({ providers }: ProviderListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {providers.map((provider) => (
        <ProviderCard key={provider.id} provider={provider} />
      ))}
    </div>
  );
}
