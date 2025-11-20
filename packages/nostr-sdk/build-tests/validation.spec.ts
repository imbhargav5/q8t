import { describe, expect, it } from "vitest";
import {
  EventKind,
  createEvent,
  finishEvent,
  generateSecretKey,
  getEventKindCategory,
  getPublicKey,
  isExpired,
  matchFilter,
  matchFilters,
  now,
  validateFilter,
} from "../src";

describe("Event validation", () => {
  it("should match filter by author", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const unsigned = createEvent(pk, EventKind.Text, "Test");
    const event = await finishEvent(unsigned, sk);

    const filter = { authors: [pk] };
    expect(matchFilter(filter, event)).toBe(true);

    const filter2 = { authors: ["other"] };
    expect(matchFilter(filter2, event)).toBe(false);
  });

  it("should match filter by kind", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const unsigned = createEvent(pk, EventKind.Text, "Test");
    const event = await finishEvent(unsigned, sk);

    const filter = { kinds: [EventKind.Text] };
    expect(matchFilter(filter, event)).toBe(true);

    const filter2 = { kinds: [EventKind.Metadata] };
    expect(matchFilter(filter2, event)).toBe(false);
  });

  it("should match filter by time", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const timestamp = now();
    const unsigned = createEvent(pk, EventKind.Text, "Test", [], timestamp);
    const event = await finishEvent(unsigned, sk);

    const filter = { since: timestamp - 100 };
    expect(matchFilter(filter, event)).toBe(true);

    const filter2 = { since: timestamp + 100 };
    expect(matchFilter(filter2, event)).toBe(false);

    const filter3 = { until: timestamp + 100 };
    expect(matchFilter(filter3, event)).toBe(true);

    const filter4 = { until: timestamp - 100 };
    expect(matchFilter(filter4, event)).toBe(false);
  });

  it("should match filter by tags", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const unsigned = createEvent(pk, EventKind.Text, "Test", [
      ["t", "nostr"],
      ["p", "abc"],
    ]);
    const event = await finishEvent(unsigned, sk);

    const filter = { "#t": ["nostr"] };
    expect(matchFilter(filter, event)).toBe(true);

    const filter2 = { "#t": ["bitcoin"] };
    expect(matchFilter(filter2, event)).toBe(false);

    const filter3 = { "#p": ["abc"] };
    expect(matchFilter(filter3, event)).toBe(true);
  });

  it("should match multiple filters", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);
    const unsigned = createEvent(pk, EventKind.Text, "Test");
    const event = await finishEvent(unsigned, sk);

    const filters = [{ kinds: [EventKind.Metadata] }, { kinds: [EventKind.Text] }];
    expect(matchFilters(filters, event)).toBe(true);

    const filters2 = [{ kinds: [EventKind.Metadata] }, { kinds: [EventKind.Contacts] }];
    expect(matchFilters(filters2, event)).toBe(false);
  });

  it("should validate filter structure", () => {
    expect(validateFilter({ kinds: [1] })).toBe(true);
    expect(validateFilter({ authors: ["a".repeat(64)] })).toBe(true);
    expect(validateFilter({ since: now() })).toBe(true);
    expect(validateFilter({ limit: 10 })).toBe(true);

    // biome-ignore lint/suspicious/noExplicitAny: Testing invalid types
    expect(validateFilter({ kinds: "invalid" as any })).toBe(false);
    expect(validateFilter({ authors: ["invalid"] })).toBe(false);
  });

  it("should detect expired events", async () => {
    const sk = generateSecretKey();
    const pk = getPublicKey(sk);

    // Not expired
    const unsigned1 = createEvent(pk, EventKind.Text, "Test", [
      ["expiration", (now() + 3600).toString()],
    ]);
    const event1 = await finishEvent(unsigned1, sk);
    expect(isExpired(event1)).toBe(false);

    // Expired
    const unsigned2 = createEvent(pk, EventKind.Text, "Test", [
      ["expiration", (now() - 3600).toString()],
    ]);
    const event2 = await finishEvent(unsigned2, sk);
    expect(isExpired(event2)).toBe(true);
  });

  it("should categorize event kinds", () => {
    expect(getEventKindCategory(1)).toBe("regular");
    expect(getEventKindCategory(10000)).toBe("replaceable");
    expect(getEventKindCategory(20000)).toBe("ephemeral");
    expect(getEventKindCategory(30000)).toBe("parameterized-replaceable");
  });
});
