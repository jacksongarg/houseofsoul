'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Info } from 'lucide-react';
import { Input } from '@/components/ui/Input';
import { useProfileStore } from '@/stores/profile-store';

export function BirthDataStep() {
  const { partialProfile, updatePartialProfile } = useProfileStore();

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: string, value: string) => {
    updatePartialProfile({ [field]: value });
    // Clear error when user types
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: '' }));
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
          <Sparkles className="w-8 h-8 text-gold" />
        </motion.div>
        <h1 className="text-3xl md:text-4xl font-serif mb-4">Your Cosmic Coordinates</h1>
        <p className="text-ivory/60 max-w-md mx-auto">
          Your birth details form the foundation of your soul profile. They reveal your
          unique energetic blueprint.
        </p>
      </div>

      {/* Form */}
      <div className="space-y-6">
        <Input
          label="Full Name"
          placeholder="As it appears at birth"
          value={partialProfile.full_name || ''}
          onChange={(e) => handleChange('full_name', e.target.value)}
          error={errors.full_name}
        />

        <div className="grid md:grid-cols-2 gap-6">
          <Input
            label="Date of Birth"
            type="date"
            value={partialProfile.date_of_birth || ''}
            onChange={(e) => handleChange('date_of_birth', e.target.value)}
            error={errors.date_of_birth}
          />

          <div>
            <Input
              label="Time of Birth"
              type="time"
              value={partialProfile.time_of_birth || ''}
              onChange={(e) => handleChange('time_of_birth', e.target.value)}
              hint="If unknown, you can leave blank"
            />
          </div>
        </div>

        <Input
          label="Place of Birth"
          placeholder="City, Country"
          value={partialProfile.place_of_birth || ''}
          onChange={(e) => handleChange('place_of_birth', e.target.value)}
          error={errors.place_of_birth}
        />

        {/* Info box */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="flex items-start gap-3 p-4 bg-gold/5 border border-gold/20 rounded"
        >
          <Info className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
          <p className="text-sm text-ivory/70">
            Your birth data is used to calculate your astrological chart and numerology
            profile. The more accurate the information, the more precise your insights
            will be.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
