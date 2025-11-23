import type { AnalyzeInput, SentimentResult, Sentiment, Emotion } from '../types'

/**
 * Positive keywords for sentiment classification
 */
const POSITIVE_KEYWORDS = [
  'love',
  'great',
  'awesome',
  'excellent',
  'amazing',
  'wonderful',
  'fantastic',
  'best',
  'perfect',
  'happy',
  'glad',
  'thanks',
  'thank you',
  'appreciate',
  'impressed',
  'outstanding',
  'brilliant',
  'superb',
  'delighted',
  'excited',
  'innovation',
  'seamless',
  'beautiful',
  'good',
  'nice',
  'well',
  'enjoy',
  'recommend',
  'positive',
  'satisfied',
]

/**
 * Negative keywords for sentiment classification
 */
const NEGATIVE_KEYWORDS = [
  'hate',
  'terrible',
  'awful',
  'bad',
  'worst',
  'horrible',
  'poor',
  'disappointed',
  'frustrating',
  'frustrated',
  'angry',
  'mad',
  'sucks',
  'useless',
  'broken',
  'bug',
  'error',
  'issue',
  'problem',
  'fail',
  'failed',
  'not working',
  "doesn't work",
  'crash',
  'slow',
  'laggy',
  'unhappy',
  'negative',
  'waste',
  'regret',
]

/**
 * Emotion keywords mapping
 */
const EMOTION_KEYWORDS: Record<Emotion, string[]> = {
  joy: ['happy', 'joyful', 'delighted', 'cheerful', 'pleased'],
  love: ['love', 'adore', 'cherish', 'appreciate', 'thankful'],
  surprise: ['surprised', 'amazed', 'shocked', 'unexpected', 'wow'],
  anger: ['angry', 'mad', 'furious', 'enraged', 'outraged'],
  sadness: ['sad', 'unhappy', 'depressed', 'miserable', 'down'],
  fear: ['afraid', 'scared', 'worried', 'anxious', 'concerned'],
  disgust: ['disgusted', 'revolted', 'repulsed', 'gross', 'yuck'],
  frustration: ['frustrated', 'frustrating', 'annoyed', 'irritated'],
  disappointment: ['disappointed', 'let down', 'dismayed', 'disheartened'],
  excitement: ['excited', 'thrilled', 'eager', 'enthusiastic'],
  satisfaction: ['satisfied', 'content', 'pleased', 'fulfilled'],
  confusion: ['confused', 'puzzled', 'uncertain', 'unclear', 'lost'],
}

/**
 * Keyword-based sentiment analyzer
 *
 * Fast, offline sentiment analysis using keyword matching.
 * Good for real-time processing where accuracy can be traded for speed.
 */
export class KeywordAnalyzer {
  /**
   * Analyze sentiment of text
   */
  static analyze(input: AnalyzeInput): SentimentResult {
    const lowerText = input.text.toLowerCase()

    // Count keyword matches
    let positiveCount = 0
    let negativeCount = 0
    const matchedKeywords: string[] = []

    // Count positive keywords
    for (const keyword of POSITIVE_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        positiveCount++
        matchedKeywords.push(keyword)
      }
    }

    // Count negative keywords
    for (const keyword of NEGATIVE_KEYWORDS) {
      if (lowerText.includes(keyword)) {
        negativeCount++
        matchedKeywords.push(keyword)
      }
    }

    // Determine sentiment
    let sentiment: Sentiment = 'neutral'
    let score = 0
    let confidence = 0.5

    if (positiveCount > negativeCount) {
      sentiment = 'positive'
      score = Math.min(1.0, 0.3 + positiveCount * 0.15)
      confidence = Math.min(0.95, 0.6 + positiveCount * 0.1)
    } else if (negativeCount > positiveCount) {
      sentiment = 'negative'
      score = Math.max(-1.0, -0.3 - negativeCount * 0.15)
      confidence = Math.min(0.95, 0.6 + negativeCount * 0.1)
    } else if (positiveCount === 0 && negativeCount === 0) {
      sentiment = 'neutral'
      score = 0
      confidence = 0.5
    } else {
      // Mixed sentiment
      sentiment = 'neutral'
      score = 0
      confidence = 0.6
    }

    // Detect emotions
    const emotions = this.detectEmotions(lowerText)

    return {
      sentiment,
      score,
      confidence,
      emotions,
      keywords: matchedKeywords,
    }
  }

  /**
   * Detect emotions in text
   */
  private static detectEmotions(text: string): Record<string, number> {
    const emotions: Record<string, number> = {}

    for (const [emotion, keywords] of Object.entries(EMOTION_KEYWORDS)) {
      let count = 0
      for (const keyword of keywords) {
        if (text.includes(keyword)) {
          count++
        }
      }

      if (count > 0) {
        // Normalize to 0-1 range, max out at 3 keywords
        emotions[emotion] = Math.min(1.0, count / 3)
      }
    }

    return emotions
  }

  /**
   * Analyze multiple texts in batch
   */
  static analyzeBatch(
    inputs: Array<{ id: string; text: string; language?: string }>,
  ): Array<SentimentResult & { id: string }> {
    return inputs.map((input) => ({
      id: input.id,
      ...this.analyze({
        text: input.text,
        language: input.language || 'en',
      }),
    }))
  }
}
