import type { ContentTemplate } from "../zod-schemas/template.schema";

export const mockTemplates: ContentTemplate[] = [
  {
    id: "template-1",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Product Launch Announcement",
    description: "Template for announcing new product launches",
    category: "announcement",
    content: "🚀 Exciting news! We're thrilled to announce {{product_name}}!\n\n{{product_description}}\n\nAvailable now at {{link}}\n\n{{hashtags}}",
    media_urls: [],
    variables: [
      { name: "product_name", placeholder: "Enter product name", default_value: null },
      { name: "product_description", placeholder: "Enter product description", default_value: null },
      { name: "link", placeholder: "Enter product URL", default_value: null },
      { name: "hashtags", placeholder: "Enter hashtags", default_value: "#newproduct #launch" },
    ],
    platforms: ["twitter", "linkedin", "facebook"],
    hashtags: ["#newproduct", "#launch", "#innovation"],
    is_public: false,
    usage_count: 24,
    last_used_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300",
    created_at: new Date("2024-01-15").toISOString(),
    updated_at: new Date("2024-11-01").toISOString(),
  },
  {
    id: "template-2",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Monday Motivation",
    description: "Inspirational post template for Monday mornings",
    category: "engagement",
    content: "☀️ Happy Monday!\n\n{{quote}}\n\nLet's make this week amazing! 💪\n\n{{call_to_action}}",
    media_urls: ["https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=800"],
    variables: [
      { name: "quote", placeholder: "Enter inspirational quote", default_value: "Success is not final, failure is not fatal: it is the courage to continue that counts." },
      { name: "call_to_action", placeholder: "Enter CTA", default_value: "What are your goals this week?" },
    ],
    platforms: ["instagram", "twitter", "linkedin"],
    hashtags: ["#MondayMotivation", "#Inspiration", "#Success"],
    is_public: true,
    usage_count: 52,
    last_used_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1516414447565-b14be0adf13e?w=300",
    created_at: new Date("2024-02-01").toISOString(),
    updated_at: new Date("2024-10-15").toISOString(),
  },
  {
    id: "template-3",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Educational Tip",
    description: "Share quick tips and educational content",
    category: "educational",
    content: "💡 Pro Tip: {{tip_title}}\n\n{{tip_content}}\n\nTry it out and let us know how it works for you!\n\n#TipTuesday #LearnSomethingNew",
    media_urls: [],
    variables: [
      { name: "tip_title", placeholder: "Enter tip title", default_value: null },
      { name: "tip_content", placeholder: "Enter tip content", default_value: null },
    ],
    platforms: ["twitter", "linkedin"],
    hashtags: ["#TipTuesday", "#LearnSomethingNew", "#ProTip"],
    is_public: false,
    usage_count: 18,
    last_used_at: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=300",
    created_at: new Date("2024-03-10").toISOString(),
    updated_at: new Date("2024-09-20").toISOString(),
  },
  {
    id: "template-4",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Customer Testimonial",
    description: "Showcase customer reviews and testimonials",
    category: "promotional",
    content: "⭐️⭐️⭐️⭐️⭐️\n\n\"{{testimonial}}\"\n\n- {{customer_name}}, {{customer_title}}\n\nWant to experience the same results? {{link}}",
    media_urls: [],
    variables: [
      { name: "testimonial", placeholder: "Enter customer testimonial", default_value: null },
      { name: "customer_name", placeholder: "Enter customer name", default_value: null },
      { name: "customer_title", placeholder: "Enter customer title", default_value: null },
      { name: "link", placeholder: "Enter product/service URL", default_value: null },
    ],
    platforms: ["linkedin", "twitter", "facebook"],
    hashtags: ["#CustomerSuccess", "#Testimonial", "#Reviews"],
    is_public: false,
    usage_count: 31,
    last_used_at: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=300",
    created_at: new Date("2024-04-05").toISOString(),
    updated_at: new Date("2024-11-10").toISOString(),
  },
  {
    id: "template-5",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Behind the Scenes",
    description: "Give followers a peek behind the curtain",
    category: "behind_the_scenes",
    content: "👀 Behind the Scenes: {{title}}\n\n{{description}}\n\nWe love sharing our process with you! What would you like to see more of?\n\n#BTS #BehindTheScenes",
    media_urls: ["https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800"],
    variables: [
      { name: "title", placeholder: "Enter BTS title", default_value: null },
      { name: "description", placeholder: "Describe what's happening", default_value: null },
    ],
    platforms: ["instagram", "facebook"],
    hashtags: ["#BTS", "#BehindTheScenes", "#TeamWork"],
    is_public: true,
    usage_count: 15,
    last_used_at: new Date(Date.now() - 20 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=300",
    created_at: new Date("2024-05-12").toISOString(),
    updated_at: new Date("2024-08-22").toISOString(),
  },
  {
    id: "template-6",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Question Post",
    description: "Engage audience with thought-provoking questions",
    category: "question",
    content: "🤔 Quick Question:\n\n{{question}}\n\nDrop your answer in the comments! 👇\n\n{{context}}",
    media_urls: [],
    variables: [
      { name: "question", placeholder: "Enter your question", default_value: null },
      { name: "context", placeholder: "Add context (optional)", default_value: "" },
    ],
    platforms: ["twitter", "linkedin", "facebook"],
    hashtags: ["#Question", "#EngageWithUs", "#Community"],
    is_public: false,
    usage_count: 28,
    last_used_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: null,
    created_at: new Date("2024-06-08").toISOString(),
    updated_at: new Date("2024-11-15").toISOString(),
  },
  {
    id: "template-7",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "Holiday Greeting",
    description: "Seasonal greetings for holidays",
    category: "seasonal",
    content: "🎉 Happy {{holiday}}! 🎊\n\n{{greeting_message}}\n\n{{special_offer}}\n\n#{{holiday}} #Celebration",
    media_urls: [],
    variables: [
      { name: "holiday", placeholder: "Enter holiday name", default_value: null },
      { name: "greeting_message", placeholder: "Enter greeting message", default_value: null },
      { name: "special_offer", placeholder: "Add special offer (optional)", default_value: "" },
    ],
    platforms: ["instagram", "facebook", "twitter"],
    hashtags: ["#Holiday", "#Celebration", "#SpecialDay"],
    is_public: true,
    usage_count: 12,
    last_used_at: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: "https://images.unsplash.com/photo-1482517967863-00e15c9b44be?w=300",
    created_at: new Date("2024-07-20").toISOString(),
    updated_at: new Date("2024-10-01").toISOString(),
  },
  {
    id: "template-8",
    workspace_id: "workspace-1",
    user_id: "user-1",
    name: "User Generated Content",
    description: "Repost and credit user-generated content",
    category: "user_generated",
    content: "📸 We love seeing how you use our {{product}}!\n\nAmazing shot by @{{username}} 👏\n\nTag us in your photos for a chance to be featured!\n\n#UGC #Community",
    media_urls: [],
    variables: [
      { name: "product", placeholder: "Enter product name", default_value: null },
      { name: "username", placeholder: "Enter user's handle", default_value: null },
    ],
    platforms: ["instagram", "twitter"],
    hashtags: ["#UGC", "#Community", "#CustomerLove"],
    is_public: false,
    usage_count: 9,
    last_used_at: new Date(Date.now() - 45 * 24 * 60 * 60 * 1000).toISOString(),
    thumbnail_url: null,
    created_at: new Date("2024-08-15").toISOString(),
    updated_at: new Date("2024-09-05").toISOString(),
  },
];

export function getTemplatesByCategory(category: ContentTemplate["category"]): ContentTemplate[] {
  return mockTemplates.filter((t) => t.category === category);
}

export function getPublicTemplates(): ContentTemplate[] {
  return mockTemplates.filter((t) => t.is_public);
}

export function searchTemplates(query: string): ContentTemplate[] {
  const lowerQuery = query.toLowerCase();
  return mockTemplates.filter(
    (t) =>
      t.name.toLowerCase().includes(lowerQuery) ||
      t.description?.toLowerCase().includes(lowerQuery) ||
      t.content.toLowerCase().includes(lowerQuery)
  );
}

export function getMostUsedTemplates(limit: number = 5): ContentTemplate[] {
  return [...mockTemplates].sort((a, b) => b.usage_count - a.usage_count).slice(0, limit);
}
