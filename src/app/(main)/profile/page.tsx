'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  OnboardingLayout,
  BirthDataStep,
  PersonalContextStep,
  LifeGoalsStep,
  SpiritualPathStep,
  PreferencesStep,
} from '@/components/onboarding';
import { useProfileStore } from '@/stores/profile-store';
import { useAuthStore } from '@/stores/auth-store';
import { supabase } from '@/lib/supabase';

export default function ProfilePage() {
  const router = useRouter();
  const { currentStep, nextStep, prevStep, partialProfile, resetOnboarding } =
    useProfileStore();
  const { user, isAuthenticated } = useAuthStore();
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Validate current step data
  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return !!(
          partialProfile.full_name &&
          partialProfile.date_of_birth &&
          partialProfile.place_of_birth
        );
      case 2:
        return true; // Optional fields
      case 3:
        return (partialProfile.life_goals?.length || 0) > 0;
      case 4:
        return (partialProfile.spiritual_beliefs?.length || 0) > 0;
      case 5:
        return !!partialProfile.budget_tier;
      default:
        return false;
    }
  };

  const handleComplete = async () => {
    if (!canProceed()) return;

    setIsSubmitting(true);

    try {
      // If not authenticated, redirect to signup with profile data saved
      if (!isAuthenticated || !user) {
        // Profile data is already persisted in localStorage via Zustand
        router.push('/signup?redirect=/dashboard');
        return;
      }

      // Create soul profile in database
      const { error } = await supabase.from('soul_profiles').upsert({
        user_id: user.id,
        full_name: partialProfile.full_name,
        date_of_birth: partialProfile.date_of_birth,
        time_of_birth: partialProfile.time_of_birth || null,
        place_of_birth: partialProfile.place_of_birth,
        gender: partialProfile.gender || null,
        pronouns: partialProfile.pronouns || null,
        relationship_status: partialProfile.relationship_status || null,
        current_city: partialProfile.current_city || null,
        life_goals: partialProfile.life_goals || [],
        pain_points: partialProfile.pain_points || [],
        areas_needing_support: partialProfile.areas_needing_support || [],
        spiritual_beliefs: partialProfile.spiritual_beliefs || [],
        modality_openness: partialProfile.modality_openness || [],
        budget_tier: partialProfile.budget_tier || 'premium',
        style_preferences: partialProfile.style_preferences || [],
        profile_completion: 100,
        onboarding_step: 5,
        is_complete: true,
      });

      if (error) {
        console.error('Error saving profile:', error);
        throw error;
      }

      // Clear onboarding state and redirect
      resetOnboarding();
      router.push('/dashboard');
    } catch (error) {
      console.error('Failed to complete profile:', error);
      // Show error toast or message
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return <BirthDataStep />;
      case 2:
        return <PersonalContextStep />;
      case 3:
        return <LifeGoalsStep />;
      case 4:
        return <SpiritualPathStep />;
      case 5:
        return <PreferencesStep />;
      default:
        return <BirthDataStep />;
    }
  };

  return (
    <OnboardingLayout
      currentStep={currentStep}
      totalSteps={5}
      onNext={nextStep}
      onPrev={prevStep}
      onComplete={handleComplete}
      canProceed={canProceed()}
      isSubmitting={isSubmitting}
    >
      {renderStep()}
    </OnboardingLayout>
  );
}
