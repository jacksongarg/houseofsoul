'use client';

import { motion } from 'framer-motion';
import { Target, Heart, Briefcase, DollarSign, Leaf, Compass, Palette, Sun, Users, Search } from 'lucide-react';
import { useProfileStore } from '@/stores/profile-store';
import { LifeGoal, PainPoint, SupportArea } from '@/types/database';

const LIFE_GOALS: { value: LifeGoal; label: string; icon: React.ElementType }[] = [
  { value: 'career_growth', label: 'Career Growth', icon: Briefcase },
  { value: 'love_relationship', label: 'Love & Relationship', icon: Heart },
  { value: 'financial_abundance', label: 'Financial Abundance', icon: DollarSign },
  { value: 'health_wellness', label: 'Health & Wellness', icon: Leaf },
  { value: 'spiritual_growth', label: 'Spiritual Growth', icon: Sun },
  { value: 'life_purpose', label: 'Life Purpose', icon: Compass },
  { value: 'creativity', label: 'Creativity', icon: Palette },
  { value: 'peace_clarity', label: 'Peace & Clarity', icon: Target },
  { value: 'family_harmony', label: 'Family Harmony', icon: Users },
  { value: 'self_discovery', label: 'Self Discovery', icon: Search },
];

const PAIN_POINTS: { value: PainPoint; label: string }[] = [
  { value: 'anxiety_stress', label: 'Anxiety & Stress' },
  { value: 'relationship_issues', label: 'Relationship Issues' },
  { value: 'career_confusion', label: 'Career Confusion' },
  { value: 'financial_struggles', label: 'Financial Struggles' },
  { value: 'health_concerns', label: 'Health Concerns' },
  { value: 'lack_of_direction', label: 'Lack of Direction' },
  { value: 'grief_loss', label: 'Grief & Loss' },
  { value: 'self_doubt', label: 'Self Doubt' },
  { value: 'burnout', label: 'Burnout' },
  { value: 'spiritual_disconnection', label: 'Spiritual Disconnection' },
];

const SUPPORT_AREAS: { value: SupportArea; label: string }[] = [
  { value: 'timing_decisions', label: 'Timing Decisions' },
  { value: 'relationship_guidance', label: 'Relationship Guidance' },
  { value: 'career_path', label: 'Career Path' },
  { value: 'health_alignment', label: 'Health Alignment' },
  { value: 'spiritual_practice', label: 'Spiritual Practice' },
  { value: 'energy_clearing', label: 'Energy Clearing' },
  { value: 'life_transitions', label: 'Life Transitions' },
  { value: 'daily_rituals', label: 'Daily Rituals' },
  { value: 'protection_grounding', label: 'Protection & Grounding' },
  { value: 'manifestation', label: 'Manifestation' },
];

function MultiSelectChips<T extends string>({
  options,
  selected,
  onChange,
  showIcon = false,
}: {
  options: { value: T; label: string; icon?: React.ElementType }[];
  selected: T[];
  onChange: (selected: T[]) => void;
  showIcon?: boolean;
}) {
  const toggleOption = (value: T) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value));
    } else {
      onChange([...selected, value]);
    }
  };

  return (
    <div className="flex flex-wrap gap-3">
      {options.map((option, index) => {
        const isSelected = selected.includes(option.value);
        const Icon = option.icon;

        return (
          <motion.button
            key={option.value}
            type="button"
            onClick={() => toggleOption(option.value)}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.03 }}
            className={`
              px-4 py-3 border transition-all duration-200 flex items-center gap-2
              ${
                isSelected
                  ? 'border-gold bg-gold/10 text-gold'
                  : 'border-graphite hover:border-gold/50 text-ivory/80'
              }
            `}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            {showIcon && Icon && <Icon className="w-4 h-4" />}
            <span className="text-sm">{option.label}</span>
          </motion.button>
        );
      })}
    </div>
  );
}

export function LifeGoalsStep() {
  const { partialProfile, updatePartialProfile } = useProfileStore();

  return (
    <div>
      {/* Header */}
      <div className="text-center mb-12">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="w-16 h-16 mx-auto mb-6 rounded-full bg-gold/10 flex items-center justify-center"
        >
          <Target className="w-8 h-8 text-gold" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Your Life Journey</h1>
        <p className="text-ivory/60 max-w-md mx-auto">
          Share what you&apos;re seeking and facing. This helps us curate the right
          guidance for you.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {/* Life Goals */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">What are you seeking?</h3>
          <p className="text-sm text-ivory/50 mb-4">Select all that resonate</p>
          <MultiSelectChips
            options={LIFE_GOALS}
            selected={partialProfile.life_goals || []}
            onChange={(goals) => updatePartialProfile({ life_goals: goals })}
            showIcon
          />
        </div>

        {/* Pain Points */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">Current challenges</h3>
          <p className="text-sm text-ivory/50 mb-4">What weighs on you?</p>
          <MultiSelectChips
            options={PAIN_POINTS}
            selected={partialProfile.pain_points || []}
            onChange={(points) => updatePartialProfile({ pain_points: points })}
          />
        </div>

        {/* Support Areas */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">Where do you need support?</h3>
          <p className="text-sm text-ivory/50 mb-4">Areas for guidance</p>
          <MultiSelectChips
            options={SUPPORT_AREAS}
            selected={partialProfile.areas_needing_support || []}
            onChange={(areas) => updatePartialProfile({ areas_needing_support: areas })}
          />
        </div>
      </div>
    </div>
  );
}
