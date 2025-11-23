import type { ShortLink, LinkClick } from "@/lib/zod-schemas/link.schema";

export const mockShortLinks: ShortLink[] = [
  {
    id: "link-1",
    workspace_id: "ws-1",
    user_id: "user-1",
    original_url: "https://example.com/blog/introducing-new-product-2024",
    short_code: "np2024",
    short_url: "https://short.link/np2024",
    utm_source: "twitter",
    utm_medium: "social",
    utm_campaign: "product_launch_2024",
    utm_term: null,
    utm_content: "announcement_post",
    title: "New Product Launch 2024",
    description: "Product announcement campaign link",
    tags: ["product-launch", "marketing"],
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://short.link/np2024",
    clicks: 1247,
    unique_clicks: 892,
    last_clicked_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    is_active: true,
    expires_at: null,
    password: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7).toISOString(),
  },
  {
    id: "link-2",
    workspace_id: "ws-1",
    user_id: "user-1",
    original_url: "https://example.com/holiday-sale?discount=50",
    short_code: "holiday50",
    short_url: "https://short.link/holiday50",
    utm_source: "instagram",
    utm_medium: "story",
    utm_campaign: "holiday_sale_2024",
    utm_term: null,
    utm_content: "story_swipe_up",
    title: "Holiday Sale 50% Off",
    description: "Instagram story swipe-up link",
    tags: ["sale", "holiday", "instagram"],
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://short.link/holiday50",
    clicks: 3456,
    unique_clicks: 2103,
    last_clicked_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    is_active: true,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30).toISOString(),
    password: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 14).toISOString(),
  },
  {
    id: "link-3",
    workspace_id: "ws-1",
    user_id: "user-1",
    original_url: "https://example.com/webinar-registration",
    short_code: "webinar",
    short_url: "https://short.link/webinar",
    utm_source: "linkedin",
    utm_medium: "post",
    utm_campaign: "webinar_q1_2024",
    utm_term: "digital_marketing",
    utm_content: "organic_post",
    title: "Q1 Webinar Registration",
    description: "LinkedIn webinar promotion",
    tags: ["webinar", "event", "linkedin"],
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://short.link/webinar",
    clicks: 567,
    unique_clicks: 432,
    last_clicked_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    is_active: true,
    expires_at: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7).toISOString(),
    password: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
  },
  {
    id: "link-4",
    workspace_id: "ws-1",
    user_id: "user-1",
    original_url: "https://example.com/exclusive-content",
    short_code: "vip2024",
    short_url: "https://short.link/vip2024",
    utm_source: "email",
    utm_medium: "newsletter",
    utm_campaign: "vip_content",
    utm_term: null,
    utm_content: "email_cta",
    title: "VIP Exclusive Content",
    description: "Password-protected VIP content",
    tags: ["exclusive", "vip"],
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://short.link/vip2024",
    clicks: 234,
    unique_clicks: 189,
    last_clicked_at: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    is_active: true,
    expires_at: null,
    password: "vip123",
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3).toISOString(),
  },
  {
    id: "link-5",
    workspace_id: "ws-1",
    user_id: "user-1",
    original_url: "https://example.com/old-campaign",
    short_code: "old2023",
    short_url: "https://short.link/old2023",
    utm_source: "facebook",
    utm_medium: "ad",
    utm_campaign: "old_campaign_2023",
    utm_term: null,
    utm_content: null,
    title: "Old Campaign (Archived)",
    description: "Expired campaign from 2023",
    tags: ["archived"],
    qr_code_url: "https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://short.link/old2023",
    clicks: 5432,
    unique_clicks: 3210,
    last_clicked_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
    is_active: false,
    expires_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    password: null,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 120).toISOString(),
    updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 60).toISOString(),
  },
];

export const mockLinkClicks: LinkClick[] = [
  {
    id: "click-1",
    link_id: "link-1",
    clicked_at: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    country: "United States",
    city: "New York",
    device_type: "mobile",
    browser: "Chrome",
    os: "iOS",
    referrer: "https://twitter.com",
    ip_address: "192.168.1.100",
  },
  {
    id: "click-2",
    link_id: "link-1",
    clicked_at: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    country: "United Kingdom",
    city: "London",
    device_type: "desktop",
    browser: "Safari",
    os: "macOS",
    referrer: "https://twitter.com",
    ip_address: "192.168.1.101",
  },
  {
    id: "click-3",
    link_id: "link-2",
    clicked_at: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    country: "Canada",
    city: "Toronto",
    device_type: "mobile",
    browser: "Instagram",
    os: "Android",
    referrer: "https://instagram.com",
    ip_address: "192.168.1.102",
  },
];

// Helper functions
export function getActiveLinks() {
  return mockShortLinks.filter((link) => link.is_active);
}

export function getExpiredLinks() {
  return mockShortLinks.filter((link) => {
    if (!link.expires_at) return false;
    return new Date(link.expires_at) < new Date();
  });
}

export function getLinksByTag(tag: string) {
  return mockShortLinks.filter((link) => link.tags.includes(tag));
}

export function getTotalClicks() {
  return mockShortLinks.reduce((sum, link) => sum + link.clicks, 0);
}

export function getTotalUniqueClicks() {
  return mockShortLinks.reduce((sum, link) => sum + link.unique_clicks, 0);
}
