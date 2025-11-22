"use client";

import type { ProviderDefinition } from "@/lib/zod-schemas";
import { ProviderCard } from "./provider-card";
import * as Listbox from "@diceui/listbox";

interface ProviderListProps {
  providers: ProviderDefinition[];
}

export function ProviderList({ providers }: ProviderListProps) {
  return (
    <Listbox.Root orientation="horizontal">
      <Listbox.Group className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <Listbox.Item key={provider.id}>
            <ProviderCard provider={provider} />
          </Listbox.Item>
        ))}
      </Listbox.Group>
    </Listbox.Root>
  );
}
