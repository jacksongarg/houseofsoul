'use client';

import { motion } from 'framer-motion';
import { User } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useProfileStore } from '@/stores/profile-store';
import { Gender, RelationshipStatus } from '@/types/database';

const GENDER_OPTIONS: { value: Gender; label: string }[] = [
  { value: 'male', label: 'Male' },
  { value: 'female', label: 'Female' },
  { value: 'non_binary', label: 'Non-binary' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

const RELATIONSHIP_OPTIONS: { value: RelationshipStatus; label: string }[] = [
  { value: 'single', label: 'Single' },
  { value: 'in_relationship', label: 'In a relationship' },
  { value: 'married', label: 'Married' },
  { value: 'divorced', label: 'Divorced' },
  { value: 'widowed', label: 'Widowed' },
  { value: 'prefer_not_to_say', label: 'Prefer not to say' },
];

export function PersonalContextStep() {
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
          <User className="w-8 h-8 text-gold" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">About You</h1>
        <p className="text-ivory/60 max-w-md mx-auto">
          Help us understand your current context to provide more relevant guidance.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-8">
        {/* Gender Selection */}
        <div>
          <label className="block text-sm font-medium text-foreground-muted mb-4 tracking-wide">
            Gender
          </label>
          <div className="grid grid-cols-2 gap-3">
            {GENDER_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => updatePartialProfile({ gender: option.value })}
                className={`
                  p-4 border text-left transition-all duration-200
                  ${
                    partialProfile.gender === option.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-graphite hover:border-gold/50'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Pronouns */}
        <Input
          label="Pronouns (optional)"
          placeholder="e.g., she/her, he/him, they/them"
          value={partialProfile.pronouns || ''}
          onChange={(e) => updatePartialProfile({ pronouns: e.target.value })}
        />

        {/* Current City */}
        <Input
          label="Current City"
          placeholder="Where do you currently live?"
          value={partialProfile.current_city || ''}
          onChange={(e) => updatePartialProfile({ current_city: e.target.value })}
        />

        {/* Relationship Status */}
        <div>
          <label className="block text-sm font-medium text-foreground-muted mb-4 tracking-wide">
            Relationship Status
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {RELATIONSHIP_OPTIONS.map((option) => (
              <motion.button
                key={option.value}
                type="button"
                onClick={() =>
                  updatePartialProfile({ relationship_status: option.value })
                }
                className={`
                  p-4 border text-left transition-all duration-200 text-sm
                  ${
                    partialProfile.relationship_status === option.value
                      ? 'border-gold bg-gold/10 text-gold'
                      : 'border-graphite hover:border-gold/50'
                  }
                `}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                {option.label}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
