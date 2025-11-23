import type { BestTimeData, AudienceActivity } from "@/lib/zod-schemas/insights.schema";

// Generate heatmap data for all days and hours
function generateHeatmapData(): BestTimeData[] {
  const data: BestTimeData[] = [];
  const days = [0, 1, 2, 3, 4, 5, 6]; // Sun - Sat
  const hours = Array.from({ length: 24 }, (_, i) => i);

  // Define peak patterns
  const peakPatterns = {
    // Weekdays (Mon-Fri): Morning (7-9), Lunch (12-13), Evening (17-21)
    weekday: {
      morning: [7, 8, 9],
      lunch: [12, 13],
      evening: [17, 18, 19, 20, 21],
    },
    // Weekend: Late morning (10-12), Afternoon (14-16), Evening (19-22)
    weekend: {
      morning: [10, 11, 12],
      afternoon: [14, 15, 16],
      evening: [19, 20, 21, 22],
    },
  };

  days.forEach((day) => {
    const isWeekend = day === 0 || day === 6;
    const pattern = isWeekend ? peakPatterns.weekend : peakPatterns.weekday;

    hours.forEach((hour) => {
      let score = 20; // Base score
      let postCount = Math.floor(Math.random() * 10) + 5;
      let avgImpressions = Math.floor(Math.random() * 5000) + 1000;

      // Increase score during peak times
      if (isWeekend) {
        const weekendPattern = peakPatterns.weekend;
        if (weekendPattern.morning.includes(hour)) {
          score += 40 + Math.random() * 20;
          postCount += 15;
          avgImpressions += 3000;
        } else if (weekendPattern.afternoon.includes(hour)) {
          score += 35 + Math.random() * 15;
          postCount += 12;
          avgImpressions += 2500;
        } else if (weekendPattern.evening.includes(hour)) {
          score += 45 + Math.random() * 25;
          postCount += 20;
          avgImpressions += 4000;
        }
      } else {
        const weekdayPattern = peakPatterns.weekday;
        if (weekdayPattern.morning.includes(hour)) {
          score += 50 + Math.random() * 25;
          postCount += 25;
          avgImpressions += 5000;
        } else if (weekdayPattern.lunch.includes(hour)) {
          score += 55 + Math.random() * 20;
          postCount += 30;
          avgImpressions += 5500;
        } else if (weekdayPattern.evening.includes(hour)) {
          score += 60 + Math.random() * 30;
          postCount += 35;
          avgImpressions += 6000;
        }
      }

      // Decrease score during late night/early morning
      if (hour >= 0 && hour <= 5) {
        score = Math.max(5, score - 30);
        postCount = Math.max(1, postCount - 10);
        avgImpressions = Math.max(500, avgImpressions - 3000);
      }

      data.push({
        day_of_week: day,
        hour,
        engagement_score: Math.min(100, Math.max(0, score)),
        post_count: postCount,
        avg_impressions: Math.floor(avgImpressions),
        avg_engagement_rate: Math.min(15, Math.max(1, (score / 100) * 15)),
      });
    });
  });

  return data;
}

export const mockAudienceActivity: AudienceActivity = {
  id: "activity-1",
  workspace_id: "ws-1",
  platform: "all",

  activity_heatmap: generateHeatmapData(),

  best_times: [
    {
      day_of_week: 2, // Tuesday
      hour: 13,
      score: 92,
      reason: "Highest engagement rate based on 45 posts",
    },
    {
      day_of_week: 3, // Wednesday
      hour: 12,
      score: 89,
      reason: "Peak audience activity with 38% reach",
    },
    {
      day_of_week: 4, // Thursday
      hour: 18,
      score: 87,
      reason: "Best time for shares and comments",
    },
    {
      day_of_week: 1, // Monday
      hour: 8,
      score: 85,
      reason: "Morning engagement spike",
    },
    {
      day_of_week: 5, // Friday
      hour: 17,
      score: 83,
      reason: "End-of-week high activity",
    },
  ],

  peak_days: ["Tuesday", "Wednesday", "Thursday"],
  peak_hours: [8, 12, 13, 17, 18, 19, 20],

  last_analyzed_at: new Date().toISOString(),
  data_points: 2547,

  created_at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
  updated_at: new Date().toISOString(),
};

export const mockPlatformActivity: Record<string, AudienceActivity> = {
  twitter: {
    ...mockAudienceActivity,
    id: "activity-twitter",
    platform: "twitter",
    best_times: [
      { day_of_week: 3, hour: 12, score: 94, reason: "Lunch hour peak" },
      { day_of_week: 2, hour: 9, score: 91, reason: "Morning commute" },
      { day_of_week: 4, hour: 17, score: 88, reason: "End of workday" },
    ],
  },
  instagram: {
    ...mockAudienceActivity,
    id: "activity-instagram",
    platform: "instagram",
    best_times: [
      { day_of_week: 0, hour: 11, score: 93, reason: "Sunday brunch browsing" },
      { day_of_week: 3, hour: 19, score: 90, reason: "Evening social time" },
      { day_of_week: 5, hour: 21, score: 87, reason: "Friday night scrolling" },
    ],
  },
  linkedin: {
    ...mockAudienceActivity,
    id: "activity-linkedin",
    platform: "linkedin",
    best_times: [
      { day_of_week: 2, hour: 8, score: 95, reason: "Tuesday morning professionals" },
      { day_of_week: 3, hour: 12, score: 92, reason: "Midweek lunch break" },
      { day_of_week: 4, hour: 17, score: 89, reason: "Thursday end-of-day" },
    ],
  },
};

// Helper functions
export function getBestTimeForDay(day: number): BestTimeData | null {
  const dayData = mockAudienceActivity.activity_heatmap.filter((d) => d.day_of_week === day);
  if (dayData.length === 0) return null;

  return dayData.reduce((best, current) =>
    current.engagement_score > best.engagement_score ? current : best
  );
}

export function getWorstTimeForDay(day: number): BestTimeData | null {
  const dayData = mockAudienceActivity.activity_heatmap.filter((d) => d.day_of_week === day);
  if (dayData.length === 0) return null;

  return dayData.reduce((worst, current) =>
    current.engagement_score < worst.engagement_score ? current : worst
  );
}

export function getAverageScoreForHour(hour: number): number {
  const hourData = mockAudienceActivity.activity_heatmap.filter((d) => d.hour === hour);
  if (hourData.length === 0) return 0;

  const sum = hourData.reduce((acc, d) => acc + d.engagement_score, 0);
  return sum / hourData.length;
}

export const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
export const dayNamesFull = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
