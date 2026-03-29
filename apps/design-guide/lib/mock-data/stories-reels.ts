export interface Story {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  media: {
    type: "image" | "video";
    url: string;
  };
  timestamp: string;
  seen: boolean;
}

export interface Reel {
  id: string;
  user: {
    id: string;
    name: string;
    avatar: string;
    verified: boolean;
  };
  video: {
    url: string;
    thumbnail: string;
  };
  caption: string;
  likes: number;
  comments: number;
  shares: number;
  timestamp: string;
}

export const mockStories: Story[] = [
  {
    id: "story-1",
    user: {
      id: "user-1",
      name: "Your Story",
      avatar: "https://avatar.vercel.sh/user-1",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=500",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    seen: false,
  },
  {
    id: "story-2",
    user: {
      id: "user-2",
      name: "Sarah Johnson",
      avatar: "https://avatar.vercel.sh/sarah",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=500",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    seen: false,
  },
  {
    id: "story-3",
    user: {
      id: "user-3",
      name: "Mike Chen",
      avatar: "https://avatar.vercel.sh/mike",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
    seen: true,
  },
  {
    id: "story-4",
    user: {
      id: "user-4",
      name: "Emily Davis",
      avatar: "https://avatar.vercel.sh/emily",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=500",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
    seen: true,
  },
  {
    id: "story-5",
    user: {
      id: "user-5",
      name: "Tech Insider",
      avatar: "https://avatar.vercel.sh/techinsider",
    },
    media: {
      type: "image",
      url: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=500",
    },
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
    seen: false,
  },
];

export const mockReels: Reel[] = [
  {
    id: "reel-1",
    user: {
      id: "user-1",
      name: "TechReviews",
      avatar: "https://avatar.vercel.sh/techreviews",
      verified: true,
    },
    video: {
      url: "https://example.com/reel1.mp4",
      thumbnail: "https://images.unsplash.com/photo-1531297484001-80022131f5a1?w=500",
    },
    caption: "Unboxing the latest tech gadget! 📱✨ #TechReview #Unboxing",
    likes: 12500,
    comments: 340,
    shares: 89,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3).toISOString(),
  },
  {
    id: "reel-2",
    user: {
      id: "user-2",
      name: "FitnessDaily",
      avatar: "https://avatar.vercel.sh/fitness",
      verified: true,
    },
    video: {
      url: "https://example.com/reel2.mp4",
      thumbnail: "https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=500",
    },
    caption: "Morning workout routine 💪 Try this at home! #Fitness #Motivation",
    likes: 8900,
    comments: 156,
    shares: 234,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: "reel-3",
    user: {
      id: "user-3",
      name: "FoodieLife",
      avatar: "https://avatar.vercel.sh/foodie",
      verified: false,
    },
    video: {
      url: "https://example.com/reel3.mp4",
      thumbnail: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500",
    },
    caption: "Best pizza recipe ever! 🍕 Tag a friend who loves pizza #FoodPorn #Recipe",
    likes: 15600,
    comments: 567,
    shares: 123,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 12).toISOString(),
  },
  {
    id: "reel-4",
    user: {
      id: "user-4",
      name: "TravelVlog",
      avatar: "https://avatar.vercel.sh/travel",
      verified: true,
    },
    video: {
      url: "https://example.com/reel4.mp4",
      thumbnail: "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=500",
    },
    caption: "Hidden gems in Bali you NEED to visit! 🌴 #Travel #Bali #Adventure",
    likes: 24300,
    comments: 892,
    shares: 456,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 18).toISOString(),
  },
  {
    id: "reel-5",
    user: {
      id: "user-5",
      name: "ComedyClub",
      avatar: "https://avatar.vercel.sh/comedy",
      verified: false,
    },
    video: {
      url: "https://example.com/reel5.mp4",
      thumbnail: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=500",
    },
    caption: "When you forget your keys at home 😂 #Funny #Comedy #Relatable",
    likes: 34500,
    comments: 1234,
    shares: 678,
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
];
