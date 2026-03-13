'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { StepIndicator } from './StepIndicator';

interface OnboardingLayoutProps {
  children: React.ReactNode;
  currentStep: number;
  totalSteps: number;
  onNext: () => void;
  onPrev: () => void;
  onComplete?: () => void;
  canProceed?: boolean;
  isSubmitting?: boolean;
}

const STEPS = [
  { title: 'Birth Data', subtitle: 'Your cosmic coordinates' },
  { title: 'About You', subtitle: 'Personal context' },
  { title: 'Life Goals', subtitle: 'What you seek' },
  { title: 'Spiritual Path', subtitle: 'Your openness' },
  { title: 'Preferences', subtitle: 'Your style' },
];

export function OnboardingLayout({
  children,
  currentStep,
  totalSteps,
  onNext,
  onPrev,
  onComplete,
  canProceed = true,
  isSubmitting = false,
}: OnboardingLayoutProps) {
  const isLastStep = currentStep === totalSteps;
  const isFirstStep = currentStep === 1;

  return (
    <div className="min-h-screen bg-onyx text-ivory">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-onyx/90 backdrop-blur-sm border-b border-graphite/30">
        <div className="container-luxury flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-serif tracking-wide text-gold">
            House of Soul
          </Link>
          <span className="text-sm text-ivory/40">Soul Profile</span>
        </div>
      </header>

      {/* Main content */}
      <main className="pt-32 pb-32 px-6">
        <div className="max-w-2xl mx-auto">
          <StepIndicator currentStep={currentStep} totalSteps={totalSteps} steps={STEPS} />

          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>
      </main>

      {/* Footer with navigation */}
      <footer className="fixed bottom-0 left-0 right-0 bg-onyx/95 backdrop-blur-sm border-t border-graphite/30">
        <div className="container-luxury py-6 flex items-center justify-between">
          {!isFirstStep ? (
            <Button variant="ghost" onClick={onPrev} disabled={isSubmitting}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          ) : (
            <Link href="/">
              <Button variant="ghost">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Home
              </Button>
            </Link>
          )}

          {isLastStep ? (
            <Button
              variant="gold"
              onClick={onComplete}
              disabled={!canProceed || isSubmitting}
            >
              {isSubmitting ? 'Creating Profile...' : 'Complete Profile'}
              {!isSubmitting && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>
          ) : (
            <Button
              variant="gold"
              onClick={onNext}
              disabled={!canProceed || isSubmitting}
            >
              Continue
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          )}
        </div>
      </footer>
    </div>
  );
}
