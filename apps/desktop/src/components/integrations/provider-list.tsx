
import type { ProviderDefinition } from "@/lib/zod-schemas";
import { ProviderCard } from "./provider-card";
import { Listbox, ListboxGroup, ListboxItem } from "@/components/ui/listbox";

interface ProviderListProps {
  providers: ProviderDefinition[];
}

export function ProviderList({ providers }: ProviderListProps) {
  return (
    <Listbox orientation="horizontal">
      <ListboxGroup className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {providers.map((provider) => (
          <ListboxItem key={provider.id} value={provider.id}>
            <ProviderCard provider={provider} />
          </ListboxItem>
        ))}
      </ListboxGroup>
    </Listbox>
  );
}
