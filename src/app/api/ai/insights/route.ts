import { NextRequest, NextResponse } from 'next/server';
import { generateSoulInsights } from '@/lib/ai-soul';
import { createServerClient } from '@/lib/supabase-server';

export async function POST(request: NextRequest) {
  try {
    const { profile } = await request.json();

    if (!profile) {
      return NextResponse.json(
        { error: 'Profile data is required' },
        { status: 400 }
      );
    }

    // Generate insights using AI
    const insights = await generateSoulInsights(profile);

    // If user_id is provided, save insights to database
    if (profile.user_id) {
      const supabase = createServerClient();

      await supabase
        .from('soul_profiles')
        .update({
          soul_archetype: insights.archetype.name,
          energy_state: insights.energyState.current,
          ai_summary: insights.archetype.description,
          recommendations_json: insights.recommendations,
        })
        .eq('user_id', profile.user_id);
    }

    return NextResponse.json({ insights });
  } catch (error) {
    console.error('Error generating insights:', error);
    return NextResponse.json(
      { error: 'Failed to generate insights' },
      { status: 500 }
    );
  }
}
