'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Sparkles,
  Sun,
  Moon,
  Star,
  Heart,
  Compass,
  Calendar,
  User,
  ShoppingBag,
  Users,
  ChevronRight,
  Loader2,
  Zap,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { useAuthStore } from '@/stores/auth-store';
import { useProfileStore } from '@/stores/profile-store';
import { supabase } from '@/lib/supabase';
import { SoulInsight } from '@/lib/ai-soul';
import { SoulProfile } from '@/types/database';

export default function DashboardPage() {
  const { user, isAuthenticated, checkAuth } = useAuthStore();
  const { partialProfile, updatePartialProfile } = useProfileStore();
  const [soulProfile, setSoulProfile] = useState<Partial<SoulProfile> | null>(null);
  const [insights, setInsights] = useState<SoulInsight | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  // Fetch profile from database on mount
  useEffect(() => {
    const fetchProfile = async () => {
      setIsLoading(true);

      // Check auth state
      const { data: { session } } = await supabase.auth.getSession();

      if (session?.user) {
        // Fetch soul profile from database
        const { data: profile } = await supabase
          .from('soul_profiles')
          .select('*')
          .eq('user_id', session.user.id)
          .single();

        if (profile) {
          setSoulProfile(profile);
          // Also update the store for consistency
          updatePartialProfile({
            full_name: profile.full_name,
            date_of_birth: profile.date_of_birth,
            time_of_birth: profile.time_of_birth,
            place_of_birth: profile.place_of_birth,
            gender: profile.gender,
            pronouns: profile.pronouns,
            relationship_status: profile.relationship_status,
            current_city: profile.current_city,
            life_goals: profile.life_goals,
            pain_points: profile.pain_points,
            areas_needing_support: profile.areas_needing_support,
            spiritual_beliefs: profile.spiritual_beliefs,
            modality_openness: profile.modality_openness,
            budget_tier: profile.budget_tier,
            style_preferences: profile.style_preferences,
          });
          setIsLoading(false);
          return;
        }
      }

      // Fall back to localStorage profile
      if (partialProfile.full_name && partialProfile.date_of_birth) {
        setSoulProfile(partialProfile as Partial<SoulProfile>);
      }

      setIsLoading(false);
    };

    fetchProfile();
  }, []);

  const hasProfile = !!(
    soulProfile?.full_name &&
    soulProfile?.date_of_birth &&
    soulProfile?.place_of_birth
  );

  useEffect(() => {
    if (hasProfile && !insights && !isLoading) {
      generateInsights();
    }
  }, [hasProfile, isLoading]);

  const generateInsights = async () => {
    setError('');

    try {
      const { data: { session } } = await supabase.auth.getSession();

      const response = await fetch('/api/ai/insights', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          profile: {
            ...soulProfile,
            user_id: session?.user?.id,
          },
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate insights');
      }

      const data = await response.json();
      setInsights(data.insights);
    } catch (err) {
      setError('Unable to generate insights. Please try again.');
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!hasProfile) {
    return (
      <div className="min-h-screen bg-onyx text-ivory">
        <Nav />
        <main className="pt-32 pb-20 px-6">
          <div className="max-w-2xl mx-auto text-center">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-20 h-20 mx-auto mb-8 rounded-full bg-gold/10 flex items-center justify-center"
            >
              <Sparkles className="w-10 h-10 text-gold" />
            </motion.div>
            <h1 className="text-3xl md:text-4xl font-serif mb-4">
              Begin Your Soul Journey
            </h1>
            <p className="text-ivory/60 mb-8">
              Complete your Soul Profile to unlock personalized insights,
              recommendations, and guidance tailored to your unique path.
            </p>
            <Link href="/profile">
              <Button variant="gold" size="lg">
                Create Soul Profile
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-onyx text-ivory">
      <Nav />

      <main className="pt-28 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-12"
          >
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-2">
              Welcome back
            </p>
            <h1 className="text-3xl md:text-4xl font-serif">
              {soulProfile?.full_name || 'Seeker'}
            </h1>
          </motion.div>

          {isLoading ? (
            <LoadingState />
          ) : error ? (
            <ErrorState message={error} onRetry={generateInsights} />
          ) : insights ? (
            <InsightsDisplay insights={insights} />
          ) : null}

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-xl font-serif text-gold mb-6">Quick Actions</h2>
            <div className="grid md:grid-cols-3 gap-4">
              <QuickActionCard
                icon={Users}
                title="Find an Expert"
                description="Book a session with a trusted guide"
                href="/experts"
              />
              <QuickActionCard
                icon={ShoppingBag}
                title="Browse Objects"
                description="Discover curated spiritual items"
                href="/shop"
              />
              <QuickActionCard
                icon={Calendar}
                title="Ritual Calendar"
                description="View auspicious dates"
                href="/calendar"
              />
            </div>
          </motion.div>
        </div>
      </main>
    </div>
  );
}

function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-onyx/90 backdrop-blur-sm border-b border-graphite/30">
      <div className="container-luxury flex items-center justify-between h-20">
        <Link href="/" className="text-2xl font-serif tracking-wide text-gold">
          House of Soul
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/profile"
            className="text-sm text-ivory/60 hover:text-gold transition-colors"
          >
            Profile
          </Link>
          <Link href="/profile">
            <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center">
              <User className="w-5 h-5 text-gold" />
            </div>
          </Link>
        </div>
      </div>
    </nav>
  );
}

function LoadingState() {
  return (
    <div className="flex flex-col items-center justify-center py-20">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 2, repeat: Infinity, ease: 'linear' }}
        className="w-16 h-16 mb-6"
      >
        <Sparkles className="w-16 h-16 text-gold" />
      </motion.div>
      <p className="text-ivory/60 text-lg">Interpreting your cosmic blueprint...</p>
      <p className="text-ivory/40 text-sm mt-2">This may take a moment</p>
    </div>
  );
}

function ErrorState({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div className="text-center py-20">
      <p className="text-red-400 mb-4">{message}</p>
      <Button variant="outline" onClick={onRetry}>
        Try Again
      </Button>
    </div>
  );
}

function InsightsDisplay({ insights }: { insights: SoulInsight }) {
  return (
    <div className="space-y-8">
      {/* Archetype Card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <Card variant="bordered" padding="lg" className="border-gold/30">
          <div className="flex items-start gap-6">
            <div className="w-20 h-20 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
              <span className="text-4xl">{insights.archetype.symbol}</span>
            </div>
            <div>
              <p className="text-gold text-sm tracking-wider uppercase mb-1">
                Your Soul Archetype
              </p>
              <h2 className="text-2xl md:text-3xl font-serif mb-2">
                {insights.archetype.name}
              </h2>
              <p className="text-ivory/60 text-sm mb-3">
                {insights.archetype.essence}
              </p>
              <p className="text-ivory/80">{insights.archetype.description}</p>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Energy State & Daily Guidance */}
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-lg">Energy State</h3>
            </div>
            <p className="text-gold font-medium mb-2">
              {insights.energyState.current}
            </p>
            <p className="text-ivory/60 text-sm mb-4">
              {insights.energyState.description}
            </p>
            <ul className="space-y-2">
              {insights.energyState.recommendations.map((rec, i) => (
                <li key={i} className="text-sm text-ivory/70 flex items-start gap-2">
                  <Star className="w-4 h-4 text-gold flex-shrink-0 mt-0.5" />
                  {rec}
                </li>
              ))}
            </ul>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
        >
          <Card variant="default" padding="lg">
            <div className="flex items-center gap-3 mb-4">
              <Sun className="w-5 h-5 text-gold" />
              <h3 className="font-serif text-lg">Daily Guidance</h3>
            </div>
            <div className="space-y-4">
              <div>
                <p className="text-xs text-gold uppercase tracking-wider mb-1">
                  Focus
                </p>
                <p className="text-ivory/80">{insights.dailyGuidance.focus}</p>
              </div>
              <div>
                <p className="text-xs text-gold uppercase tracking-wider mb-1">
                  Affirmation
                </p>
                <p className="text-ivory/80 italic">
                  &ldquo;{insights.dailyGuidance.affirmation}&rdquo;
                </p>
              </div>
              <div>
                <p className="text-xs text-gold uppercase tracking-wider mb-1">
                  Release
                </p>
                <p className="text-ivory/80">{insights.dailyGuidance.avoidance}</p>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Life Themes */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h2 className="text-xl font-serif text-gold mb-4">Life Themes</h2>
        <div className="grid md:grid-cols-3 gap-4">
          {insights.lifeThemes.map((theme, i) => (
            <Card key={i} variant="bordered" padding="md">
              <div className="flex items-center gap-2 mb-2">
                <Heart className="w-4 h-4 text-gold" />
                <h4 className="font-medium">{theme.theme}</h4>
              </div>
              <p className="text-sm text-ivory/60">{theme.insight}</p>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.35 }}
      >
        <h2 className="text-xl font-serif text-gold mb-4">Personalized Recommendations</h2>
        <Card variant="default" padding="lg">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-xs text-gold uppercase tracking-wider mb-2">
                Suggested Experts
              </p>
              <ul className="space-y-1">
                {insights.recommendations.experts.map((expert, i) => (
                  <li key={i} className="text-ivory/80 text-sm">
                    • {expert}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gold uppercase tracking-wider mb-2">
                Recommended Products
              </p>
              <ul className="space-y-1">
                {insights.recommendations.products.map((product, i) => (
                  <li key={i} className="text-ivory/80 text-sm">
                    • {product}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gold uppercase tracking-wider mb-2">
                Rituals for You
              </p>
              <ul className="space-y-1">
                {insights.recommendations.rituals.map((ritual, i) => (
                  <li key={i} className="text-ivory/80 text-sm">
                    • {ritual}
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-xs text-gold uppercase tracking-wider mb-2">
                Timing Guidance
              </p>
              <p className="text-ivory/80 text-sm">
                {insights.recommendations.timing}
              </p>
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}

function QuickActionCard({
  icon: Icon,
  title,
  description,
  href,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link href={href}>
      <Card variant="bordered" padding="md" interactive>
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center flex-shrink-0">
            <Icon className="w-6 h-6 text-gold" />
          </div>
          <div>
            <h3 className="font-medium mb-1">{title}</h3>
            <p className="text-sm text-ivory/50">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  );
}
