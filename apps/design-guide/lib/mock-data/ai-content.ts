import type { AIContentHistory, AIContentResponse } from "@/lib/zod-schemas/ai-content.schema";

export const mockAIContentHistory: AIContentHistory[] = [
  {
    id: "ai-1",
    workspace_id: "ws-1",
    user_id: "user-1",
    prompt: "Create a post about our new product launch for eco-friendly water bottles",
    tone: "professional",
    content_type: "post",
    variants: [
      {
        id: "variant-1-1",
        request_id: "ai-1",
        content: "🌍 Excited to announce our latest innovation: EcoFlow Water Bottles! Made from 100% recycled materials, designed for the modern sustainable lifestyle. Join us in making a difference, one sip at a time. Available now on our website. #Sustainability #EcoFriendly #Innovation",
        variant_number: 1,
        word_count: 42,
        character_count: 267,
        hashtags: ["#Sustainability", "#EcoFriendly", "#Innovation"],
        readability_score: 8.5,
        sentiment_score: 0.8,
        engagement_prediction: 78,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "variant-1-2",
        request_id: "ai-1",
        content: "Introducing EcoFlow - the water bottle that's as kind to the planet as it is to you. Crafted from recycled materials, built to last a lifetime. Because sustainability should be effortless. Shop now and get 20% off your first order. 🌿 #EcoFlow #SustainableLiving",
        variant_number: 2,
        word_count: 46,
        character_count: 283,
        hashtags: ["#EcoFlow", "#SustainableLiving"],
        readability_score: 9.0,
        sentiment_score: 0.7,
        engagement_prediction: 82,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
      {
        id: "variant-1-3",
        request_id: "ai-1",
        content: "Say hello to your new hydration companion! EcoFlow Water Bottles combine style, durability, and environmental responsibility. Every bottle saves 10 plastic bottles from landfills. Make the switch today. Link in bio. 💧♻️ #ZeroWaste #GreenLiving #EcoFlow",
        variant_number: 3,
        word_count: 40,
        character_count: 282,
        hashtags: ["#ZeroWaste", "#GreenLiving", "#EcoFlow"],
        readability_score: 8.2,
        sentiment_score: 0.75,
        engagement_prediction: 75,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
      },
    ],
    used_in_post_id: "post-123",
    is_favorite: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: "ai-2",
    workspace_id: "ws-1",
    user_id: "user-1",
    prompt: "Write a casual tweet about our upcoming webinar on digital marketing trends",
    tone: "casual",
    content_type: "tweet",
    variants: [
      {
        id: "variant-2-1",
        request_id: "ai-2",
        content: "Ever feel like you're missing out on the latest marketing trends? 👀 Join our free webinar next Tuesday and get the inside scoop on what's working in 2024. Limited spots available! Register now 👇",
        variant_number: 1,
        word_count: 37,
        character_count: 211,
        hashtags: [],
        readability_score: 9.5,
        sentiment_score: 0.6,
        engagement_prediction: 71,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
      {
        id: "variant-2-2",
        request_id: "ai-2",
        content: "We're spilling all the tea on digital marketing trends 🍵 Free webinar next Tuesday with our growth team. You don't want to miss this one. Link in bio to save your spot!",
        variant_number: 2,
        word_count: 33,
        character_count: 176,
        hashtags: [],
        readability_score: 9.8,
        sentiment_score: 0.5,
        engagement_prediction: 68,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      },
    ],
    used_in_post_id: null,
    is_favorite: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: "ai-3",
    workspace_id: "ws-1",
    user_id: "user-1",
    prompt: "Create an inspirational Monday motivation post for our community",
    tone: "inspirational",
    content_type: "post",
    variants: [
      {
        id: "variant-3-1",
        request_id: "ai-3",
        content: "Monday reminder: Your journey is unique, and so is your timeline. Don't compare your chapter 1 to someone else's chapter 20. Focus on progress, not perfection. You've got this! 💪✨ #MondayMotivation #PersonalGrowth #MindsetMatters",
        variant_number: 1,
        word_count: 38,
        character_count: 243,
        hashtags: ["#MondayMotivation", "#PersonalGrowth", "#MindsetMatters"],
        readability_score: 8.8,
        sentiment_score: 0.9,
        engagement_prediction: 85,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
      },
    ],
    used_in_post_id: null,
    is_favorite: true,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: "ai-4",
    workspace_id: "ws-1",
    user_id: "user-1",
    prompt: "Write an urgent announcement about our flash sale ending tonight",
    tone: "urgent",
    content_type: "ad_copy",
    variants: [
      {
        id: "variant-4-1",
        request_id: "ai-4",
        content: "⏰ FLASH SALE ENDING TONIGHT! Only 6 hours left to save 50% on everything. This is your last chance - prices go back up at midnight. Don't miss out! Shop now before it's too late. Use code: FLASH50 🔥",
        variant_number: 1,
        word_count: 41,
        character_count: 213,
        hashtags: [],
        readability_score: 9.2,
        sentiment_score: 0.3,
        engagement_prediction: 88,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      },
      {
        id: "variant-4-2",
        request_id: "ai-4",
        content: "FINAL HOURS! 50% OFF EVERYTHING ENDS TONIGHT 🚨 The clock is ticking... midnight deadline. Grab your favorites now or regret it later. Code: FLASH50. No extensions, no exceptions. GO GO GO! 🏃‍♂️💨",
        variant_number: 2,
        word_count: 34,
        character_count: 196,
        hashtags: [],
        readability_score: 9.5,
        sentiment_score: 0.2,
        engagement_prediction: 91,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
      },
    ],
    used_in_post_id: "post-456",
    is_favorite: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: "ai-5",
    workspace_id: "ws-1",
    user_id: "user-1",
    prompt: "Generate a friendly customer appreciation post for our anniversary",
    tone: "friendly",
    content_type: "post",
    variants: [
      {
        id: "variant-5-1",
        request_id: "ai-5",
        content: "🎉 We're celebrating 5 years today, and it's all thanks to YOU! To our amazing community - thank you for believing in us, supporting us, and growing with us. Here's to many more years together! Drop a ❤️ if you've been with us from the start. #Anniversary #ThankYou #Community",
        variant_number: 1,
        word_count: 53,
        character_count: 303,
        hashtags: ["#Anniversary", "#ThankYou", "#Community"],
        readability_score: 8.9,
        sentiment_score: 0.95,
        engagement_prediction: 79,
        created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
      },
    ],
    used_in_post_id: null,
    is_favorite: false,
    created_at: new Date(Date.now() - 1000 * 60 * 60 * 96).toISOString(),
  },
];

// Helper functions
export function getRecentGenerations(limit: number = 10) {
  return mockAIContentHistory
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

export function getFavoriteGenerations() {
  return mockAIContentHistory.filter((item) => item.is_favorite);
}

export function getGenerationsByTone(tone: string) {
  return mockAIContentHistory.filter((item) => item.tone === tone);
}

export function getUsedGenerations() {
  return mockAIContentHistory.filter((item) => item.used_in_post_id !== null);
}

export function getBestPerformingVariant(history: AIContentHistory): AIContentResponse {
  return history.variants.reduce((best, current) =>
    (current.engagement_prediction || 0) > (best.engagement_prediction || 0) ? current : best
  );
}
