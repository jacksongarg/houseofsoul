import Anthropic from '@anthropic-ai/sdk';
import { SoulProfile } from '@/types/database';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

export interface SoulInsight {
  archetype: {
    name: string;
    symbol: string;
    essence: string;
    description: string;
  };
  energyState: {
    current: string;
    description: string;
    recommendations: string[];
  };
  lifeThemes: {
    theme: string;
    insight: string;
  }[];
  dailyGuidance: {
    focus: string;
    affirmation: string;
    avoidance: string;
  };
  recommendations: {
    experts: string[];
    products: string[];
    rituals: string[];
    timing: string;
  };
}

export async function generateSoulInsights(profile: Partial<SoulProfile>): Promise<SoulInsight> {
  const prompt = buildInsightPrompt(profile);

  const message = await anthropic.messages.create({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const content = message.content[0];
  if (content.type !== 'text') {
    throw new Error('Unexpected response type');
  }

  // Parse the JSON response
  const jsonMatch = content.text.match(/```json\n?([\s\S]*?)\n?```/);
  if (jsonMatch) {
    return JSON.parse(jsonMatch[1]);
  }

  // Try parsing the whole response as JSON
  return JSON.parse(content.text);
}

function buildInsightPrompt(profile: Partial<SoulProfile>): string {
  const birthDate = profile.date_of_birth ? new Date(profile.date_of_birth) : null;
  const zodiacSign = birthDate ? getZodiacSign(birthDate) : 'Unknown';
  const lifePathNumber = birthDate ? calculateLifePath(birthDate) : null;

  return `You are a wise spiritual guide for House of Soul, a luxury spiritual concierge platform.
Analyze this soul profile and generate deeply personalized insights.

## Soul Profile Data
- **Name**: ${profile.full_name || 'Seeker'}
- **Birth Date**: ${profile.date_of_birth || 'Unknown'}
- **Birth Time**: ${profile.time_of_birth || 'Unknown'}
- **Birth Place**: ${profile.place_of_birth || 'Unknown'}
- **Zodiac Sign**: ${zodiacSign}
- **Life Path Number**: ${lifePathNumber || 'Unknown'}
- **Gender**: ${profile.gender || 'Not specified'}
- **Relationship Status**: ${profile.relationship_status?.replace(/_/g, ' ') || 'Not specified'}
- **Current City**: ${profile.current_city || 'Unknown'}

## Life Context
- **Life Goals**: ${profile.life_goals?.map(g => g.replace(/_/g, ' ')).join(', ') || 'Not specified'}
- **Current Challenges**: ${profile.pain_points?.map(p => p.replace(/_/g, ' ')).join(', ') || 'Not specified'}
- **Areas Needing Support**: ${profile.areas_needing_support?.map(a => a.replace(/_/g, ' ')).join(', ') || 'Not specified'}

## Spiritual Openness
- **Spiritual Beliefs**: ${profile.spiritual_beliefs?.map(b => b.replace(/_/g, ' ')).join(', ') || 'Open to exploring'}
- **Budget Tier**: ${profile.budget_tier || 'Premium'}
- **Style Preferences**: ${profile.style_preferences?.map(s => s.replace(/_/g, ' ')).join(', ') || 'Classic elegant'}

## Instructions
Generate a comprehensive soul insight report. Be specific, personal, and draw from the data provided.
Use an elevated, calm, and wise tone befitting a luxury spiritual platform.

Return ONLY valid JSON in this exact format:
\`\`\`json
{
  "archetype": {
    "name": "The [Archetype Name]",
    "symbol": "[Single emoji that represents this archetype]",
    "essence": "[3-5 word essence]",
    "description": "[2-3 sentences describing their soul archetype based on their birth data and goals]"
  },
  "energyState": {
    "current": "[Current energy state in 2-3 words]",
    "description": "[2-3 sentences about their current energetic state based on challenges]",
    "recommendations": ["[Energy recommendation 1]", "[Energy recommendation 2]", "[Energy recommendation 3]"]
  },
  "lifeThemes": [
    {"theme": "[Theme 1]", "insight": "[Personalized insight about this theme]"},
    {"theme": "[Theme 2]", "insight": "[Personalized insight about this theme]"},
    {"theme": "[Theme 3]", "insight": "[Personalized insight about this theme]"}
  ],
  "dailyGuidance": {
    "focus": "[What to focus on today]",
    "affirmation": "[Personalized affirmation]",
    "avoidance": "[What to avoid or release]"
  },
  "recommendations": {
    "experts": ["[Type of expert 1]", "[Type of expert 2]"],
    "products": ["[Product type 1]", "[Product type 2]", "[Product type 3]"],
    "rituals": ["[Ritual recommendation 1]", "[Ritual recommendation 2]"],
    "timing": "[Best timing advice for important decisions]"
  }
}
\`\`\``;
}

function getZodiacSign(date: Date): string {
  const month = date.getMonth() + 1;
  const day = date.getDate();

  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return 'Aries';
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return 'Taurus';
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return 'Gemini';
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return 'Cancer';
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return 'Leo';
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return 'Virgo';
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return 'Libra';
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return 'Scorpio';
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return 'Sagittarius';
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return 'Capricorn';
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return 'Aquarius';
  return 'Pisces';
}

function calculateLifePath(date: Date): number {
  const dateStr = date.toISOString().split('T')[0].replace(/-/g, '');
  let sum = dateStr.split('').reduce((acc, digit) => acc + parseInt(digit), 0);

  while (sum > 9 && sum !== 11 && sum !== 22 && sum !== 33) {
    sum = sum
      .toString()
      .split('')
      .reduce((acc, digit) => acc + parseInt(digit), 0);
  }

  return sum;
}
