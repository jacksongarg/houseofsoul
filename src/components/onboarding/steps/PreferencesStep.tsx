'use client';

import { motion } from 'framer-motion';
import { Settings, Gem, Leaf, Crown, Sparkles } from 'lucide-react';
import { useProfileStore } from '@/stores/profile-store';
import { BudgetTier, StylePreference } from '@/types/database';

const BUDGET_TIERS: { value: BudgetTier; label: string; description: string; icon: React.ElementType }[] = [
  {
    value: 'essential',
    label: 'Essential',
    description: 'Quality guidance at accessible pricing',
    icon: Leaf,
  },
  {
    value: 'premium',
    label: 'Premium',
    description: 'Enhanced services and expert access',
    icon: Gem,
  },
  {
    value: 'luxury',
    label: 'Luxury',
    description: 'Bespoke concierge-level experience',
    icon: Crown,
  },
];

const STYLE_PREFERENCES: { value: StylePreference; label: string; description: string }[] = [
  {
    value: 'minimalist',
    label: 'Minimalist',
    description: 'Clean, simple, essential',
  },
  {
    value: 'traditional',
    label: 'Traditional',
    description: 'Time-honored, authentic',
  },
  {
    value: 'modern',
    label: 'Modern',
    description: 'Contemporary, sleek',
  },
  {
    value: 'bohemian',
    label: 'Bohemian',
    description: 'Free-spirited, eclectic',
  },
  {
    value: 'classic_elegant',
    label: 'Classic Elegant',
    description: 'Timeless, refined',
  },
];

export function PreferencesStep() {
  const { partialProfile, updatePartialProfile } = useProfileStore();

  const toggleStyle = (style: StylePreference) => {
    const current = partialProfile.style_preferences || [];
    if (current.includes(style)) {
      updatePartialProfile({
        style_preferences: current.filter((s) => s !== style),
      });
    } else {
      updatePartialProfile({
        style_preferences: [...current, style],
      });
    }
  };

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center"
        >
          <Settings className="w-8 h-8 text-gold" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Your Preferences</h1>
        <p className="text-ivory/60 max-w-md mx-auto">
          Final touches to personalize your House of Soul experience.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {/* Budget Tier */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">Investment Level</h3>
          <p className="text-sm text-ivory/50 mb-6">
            Choose your preferred tier for recommendations
          </p>

          <div className="grid gap-4">
            {BUDGET_TIERS.map((tier, index) => {
              const isSelected = partialProfile.budget_tier === tier.value;
              const Icon = tier.icon;

              return (
                <motion.button
                  key={tier.value}
                  type="button"
                  onClick={() => updatePartialProfile({ budget_tier: tier.value })}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`
                    p-6 border text-left transition-all duration-300 flex items-start gap-4
                    ${
                      isSelected
                        ? 'border-gold bg-gold/5'
                        : 'border-graphite hover:border-gold/50'
                    }
                  `}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  <div
                    className={`
                      w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0
                      ${isSelected ? 'bg-gold/20' : 'bg-graphite/50'}
                    `}
                  >
                    <Icon
                      className={`w-6 h-6 ${
                        isSelected ? 'text-gold' : 'text-ivory/60'
                      }`}
                    />
                  </div>
                  <div>
                    <h4
                      className={`text-lg font-serif ${
                        isSelected ? 'text-gold' : 'text-ivory'
                      }`}
                    >
                      {tier.label}
                    </h4>
                    <p className="text-sm text-ivory/50 mt-1">{tier.description}</p>
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="ml-auto"
                    >
                      <Sparkles className="w-5 h-5 text-gold" />
                    </motion.div>
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Style Preferences */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">Aesthetic Style</h3>
          <p className="text-sm text-ivory/50 mb-6">
            Select styles that resonate with you (for product recommendations)
          </p>

          <div className="grid md:grid-cols-2 gap-4">
            {STYLE_PREFERENCES.map((style, index) => {
              const isSelected = partialProfile.style_preferences?.includes(
                style.value
              );

              return (
                <motion.button
                  key={style.value}
                  type="button"
                  onClick={() => toggleStyle(style.value)}
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  className={`
                    p-5 border text-left transition-all duration-200
                    ${
                      isSelected
                        ? 'border-gold bg-gold/10'
                        : 'border-graphite hover:border-gold/50'
                    }
                  `}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <h4
                    className={`font-medium ${
                      isSelected ? 'text-gold' : 'text-ivory'
                    }`}
                  >
                    {style.label}
                  </h4>
                  <p className="text-sm text-ivory/50 mt-1">{style.description}</p>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Summary preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="p-6 bg-gold/5 border border-gold/20"
        >
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-gold" />
            <h4 className="font-serif text-gold">Almost there</h4>
          </div>
          <p className="text-sm text-ivory/70">
            Once you complete your profile, our AI will analyze your cosmic
            blueprint and generate personalized insights, recommendations, and
            guidance tailored specifically to your soul&apos;s journey.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
