'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StepIndicatorProps {
  currentStep: number;
  totalSteps: number;
  steps: { title: string; subtitle?: string }[];
}

export function StepIndicator({ currentStep, totalSteps, steps }: StepIndicatorProps) {
  return (
    <div className="w-full">
      {/* Mobile: Simple progress bar */}
      <div className="md:hidden mb-8">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-ivory/60">
            Step {currentStep} of {totalSteps}
          </span>
          <span className="text-sm text-gold">{steps[currentStep - 1]?.title}</span>
        </div>
        <div className="h-1 bg-graphite rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gold"
            initial={{ width: 0 }}
            animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
            transition={{ duration: 0.5 }}
          />
        </div>
      </div>

      {/* Desktop: Step circles */}
      <div className="hidden md:flex items-center justify-center mb-12">
        {steps.map((step, index) => {
          const stepNumber = index + 1;
          const isCompleted = stepNumber < currentStep;
          const isCurrent = stepNumber === currentStep;

          return (
            <div key={step.title} className="flex items-center">
              {/* Step circle */}
              <div className="flex flex-col items-center">
                <motion.div
                  className={cn(
                    'w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300',
                    isCompleted && 'bg-gold border-gold',
                    isCurrent && 'border-gold text-gold',
                    !isCompleted && !isCurrent && 'border-graphite text-graphite'
                  )}
                  animate={{
                    scale: isCurrent ? 1.1 : 1,
                  }}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-onyx" />
                  ) : (
                    <span className="text-sm font-medium">{stepNumber}</span>
                  )}
                </motion.div>
                <span
                  className={cn(
                    'mt-2 text-xs tracking-wide transition-colors',
                    isCurrent ? 'text-gold' : 'text-ivory/40'
                  )}
                >
                  {step.title}
                </span>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div className="w-16 lg:w-24 h-px mx-4 relative">
                  <div className="absolute inset-0 bg-graphite" />
                  <motion.div
                    className="absolute inset-0 bg-gold origin-left"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: isCompleted ? 1 : 0 }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
