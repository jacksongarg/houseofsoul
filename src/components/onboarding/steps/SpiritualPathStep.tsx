'use client';

import { motion } from 'framer-motion';
import { Sparkles, Star, Moon, Sun, Zap, Heart, Flower2, Circle } from 'lucide-react';
import { useProfileStore } from '@/stores/profile-store';
import { SpiritualBelief, Modality, ModalityPreference } from '@/types/database';

const SPIRITUAL_BELIEFS: { value: SpiritualBelief; label: string; icon: React.ElementType }[] = [
  { value: 'astrology', label: 'Astrology', icon: Star },
  { value: 'numerology', label: 'Numerology', icon: Circle },
  { value: 'energy_healing', label: 'Energy Healing', icon: Zap },
  { value: 'meditation', label: 'Meditation', icon: Flower2 },
  { value: 'crystals', label: 'Crystals & Gems', icon: Sparkles },
  { value: 'tarot', label: 'Tarot', icon: Moon },
  { value: 'ancestral', label: 'Ancestral Wisdom', icon: Heart },
  { value: 'yoga', label: 'Yoga', icon: Sun },
  { value: 'ayurveda', label: 'Ayurveda', icon: Flower2 },
  { value: 'open_exploring', label: 'Open to Exploring', icon: Sparkles },
];

const MODALITIES: { value: Modality; label: string; description: string }[] = [
  {
    value: 'astrology',
    label: 'Astrology',
    description: 'Birth chart analysis and celestial timing',
  },
  {
    value: 'numerology',
    label: 'Numerology',
    description: 'Life path and destiny number insights',
  },
  {
    value: 'spiritual_guidance',
    label: 'Spiritual Guidance',
    description: 'Holistic counseling and mentorship',
  },
  {
    value: 'energy_healing',
    label: 'Energy Healing',
    description: 'Reiki, chakra work, and energy clearing',
  },
  {
    value: 'tarot',
    label: 'Tarot & Divination',
    description: 'Intuitive card readings',
  },
  {
    value: 'meditation',
    label: 'Meditation',
    description: 'Guided practices and mindfulness',
  },
];

const INTEREST_LEVELS = [
  { value: 'high', label: 'Very Interested', color: 'text-gold border-gold bg-gold/10' },
  { value: 'medium', label: 'Curious', color: 'text-celestial-blue border-celestial-blue bg-celestial-blue/10' },
  { value: 'low', label: 'Maybe', color: 'text-ivory/60 border-graphite bg-graphite/30' },
  { value: 'not_interested', label: 'Not for me', color: 'text-ivory/40 border-graphite/50' },
] as const;

export function SpiritualPathStep() {
  const { partialProfile, updatePartialProfile } = useProfileStore();

  const toggleBelief = (belief: SpiritualBelief) => {
    const current = partialProfile.spiritual_beliefs || [];
    if (current.includes(belief)) {
      updatePartialProfile({
        spiritual_beliefs: current.filter((b) => b !== belief),
      });
    } else {
      updatePartialProfile({
        spiritual_beliefs: [...current, belief],
      });
    }
  };

  const setModalityInterest = (
    modality: Modality,
    interest: 'high' | 'medium' | 'low' | 'not_interested'
  ) => {
    const current = partialProfile.modality_openness || [];
    const updated = current.filter((m) => m.modality !== modality);
    updated.push({ modality, interest_level: interest });
    updatePartialProfile({ modality_openness: updated });
  };

  const getModalityInterest = (modality: Modality) => {
    return (
      partialProfile.modality_openness?.find((m) => m.modality === modality)
        ?.interest_level || null
    );
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
          <Moon className="w-8 h-8 text-gold" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Your Spiritual Path</h1>
        <p className="text-ivory/60 max-w-md mx-auto">
          Share your spiritual interests so we can match you with the right guidance.
        </p>
      </div>

      {/* Sections */}
      <div className="space-y-10">
        {/* Spiritual Beliefs */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">
            What resonates with you?
          </h3>
          <p className="text-sm text-ivory/50 mb-4">
            Select practices you&apos;re drawn to
          </p>
          <div className="flex flex-wrap gap-3">
            {SPIRITUAL_BELIEFS.map((belief, index) => {
              const isSelected = partialProfile.spiritual_beliefs?.includes(
                belief.value
              );
              const Icon = belief.icon;

              return (
                <motion.button
                  key={belief.value}
                  type="button"
                  onClick={() => toggleBelief(belief.value)}
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
                  <Icon className="w-4 h-4" />
                  <span className="text-sm">{belief.label}</span>
                </motion.button>
              );
            })}
          </div>
        </div>

        {/* Modality Interest */}
        <div>
          <h3 className="text-lg font-serif text-gold mb-2">
            Interest in guidance types
          </h3>
          <p className="text-sm text-ivory/50 mb-6">
            Rate your interest in each modality
          </p>

          <div className="space-y-4">
            {MODALITIES.map((modality, index) => {
              const currentInterest = getModalityInterest(modality.value);

              return (
                <motion.div
                  key={modality.value}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 border border-graphite"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <h4 className="font-medium">{modality.label}</h4>
                      <p className="text-sm text-ivory/50">{modality.description}</p>
                    </div>
                    <div className="flex gap-2 flex-wrap">
                      {INTEREST_LEVELS.map((level) => (
                        <button
                          key={level.value}
                          type="button"
                          onClick={() =>
                            setModalityInterest(modality.value, level.value)
                          }
                          className={`
                            px-3 py-1.5 text-xs border transition-all rounded-full
                            ${
                              currentInterest === level.value
                                ? level.color
                                : 'border-graphite/50 text-ivory/40 hover:border-graphite'
                            }
                          `}
                        >
                          {level.label}
                        </button>
                      ))}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
