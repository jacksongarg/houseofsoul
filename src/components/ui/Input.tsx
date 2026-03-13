'use client';

import { forwardRef, InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className, label, error, hint, type = 'text', ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label className="block text-sm font-medium text-foreground-muted mb-2 tracking-wide">
            {label}
          </label>
        )}
        <input
          type={type}
          ref={ref}
          className={cn(
            `
            w-full px-5 py-4
            bg-background border border-border
            text-foreground text-base
            placeholder:text-foreground-muted
            transition-all duration-200
            focus:border-gold focus:outline-none focus:ring-0
            disabled:opacity-50 disabled:cursor-not-allowed
            `,
            error && 'border-red-500 focus:border-red-500',
            className
          )}
          {...props}
        />
        {hint && !error && (
          <p className="mt-2 text-sm text-foreground-muted">{hint}</p>
        )}
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export { Input };
