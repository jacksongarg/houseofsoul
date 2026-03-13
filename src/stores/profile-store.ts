'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  SoulProfile,
  Gender,
  RelationshipStatus,
  LifeGoal,
  PainPoint,
  SupportArea,
  SpiritualBelief,
  ModalityPreference,
  BudgetTier,
  StylePreference,
} from '@/types/database';

// Partial profile for building during onboarding
export interface PartialSoulProfile {
  // Step 1: Birth Data
  full_name?: string;
  date_of_birth?: string;
  time_of_birth?: string;
  place_of_birth?: string;

  // Step 2: Personal Context
  gender?: Gender;
  pronouns?: string;
  relationship_status?: RelationshipStatus;
  current_city?: string;

  // Step 3: Life Goals & Challenges
  life_goals?: LifeGoal[];
  pain_points?: PainPoint[];
  areas_needing_support?: SupportArea[];

  // Step 4: Spiritual Openness
  spiritual_beliefs?: SpiritualBelief[];
  modality_openness?: ModalityPreference[];

  // Step 5: Preferences
  budget_tier?: BudgetTier;
  style_preferences?: StylePreference[];
}

interface ProfileState {
  profile: SoulProfile | null;
  partialProfile: PartialSoulProfile;
  currentStep: number;
  totalSteps: number;
  isLoading: boolean;

  // Actions
  setProfile: (profile: SoulProfile | null) => void;
  updatePartialProfile: (data: Partial<PartialSoulProfile>) => void;
  setCurrentStep: (step: number) => void;
  nextStep: () => void;
  prevStep: () => void;
  resetOnboarding: () => void;
  getCompletionPercentage: () => number;
}

const TOTAL_STEPS = 5;

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      profile: null,
      partialProfile: {},
      currentStep: 1,
      totalSteps: TOTAL_STEPS,
      isLoading: false,

      setProfile: (profile) => set({ profile }),

      updatePartialProfile: (data) =>
        set((state) => ({
          partialProfile: { ...state.partialProfile, ...data },
        })),

      setCurrentStep: (step) =>
        set({ currentStep: Math.max(1, Math.min(step, TOTAL_STEPS)) }),

      nextStep: () =>
        set((state) => ({
          currentStep: Math.min(state.currentStep + 1, TOTAL_STEPS),
        })),

      prevStep: () =>
        set((state) => ({
          currentStep: Math.max(state.currentStep - 1, 1),
        })),

      resetOnboarding: () =>
        set({
          partialProfile: {},
          currentStep: 1,
        }),

      getCompletionPercentage: () => {
        const { partialProfile } = get();
        const fields = [
          partialProfile.full_name,
          partialProfile.date_of_birth,
          partialProfile.place_of_birth,
          partialProfile.gender,
          partialProfile.life_goals?.length,
          partialProfile.spiritual_beliefs?.length,
          partialProfile.budget_tier,
        ];
        const completed = fields.filter(Boolean).length;
        return Math.round((completed / fields.length) * 100);
      },
    }),
    {
      name: 'profile-storage',
      partialize: (state) => ({
        partialProfile: state.partialProfile,
        currentStep: state.currentStep,
      }),
    }
  )
);
