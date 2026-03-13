'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Mail, Lock, User, ArrowRight, Eye, EyeOff, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { useProfileStore } from '@/stores/profile-store';

export function SignupForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect') || '/dashboard';
  const { setUser } = useAuthStore();
  const { partialProfile, resetOnboarding } = useProfileStore();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Pre-fill name from soul profile if available
  useEffect(() => {
    if (partialProfile.full_name) {
      setFullName(partialProfile.full_name);
    }
  }, [partialProfile.full_name]);

  const hasProfile = !!(
    partialProfile.full_name &&
    partialProfile.date_of_birth &&
    partialProfile.place_of_birth
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // Sign up user
      const { data, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
          },
        },
      });

      if (authError) {
        setError(authError.message);
        return;
      }

      if (data.user) {
        // Wait for user record to be created by trigger
        await new Promise((resolve) => setTimeout(resolve, 500));

        // Fetch user profile
        const { data: userData } = await supabase
          .from('users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        setUser(userData);

        // If we have a partial soul profile, save it
        if (hasProfile) {
          await supabase.from('soul_profiles').upsert({
            user_id: data.user.id,
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

          resetOnboarding();
        }

        router.push(redirect);
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-onyx text-ivory flex">
      {/* Left side - decorative */}
      <div className="hidden lg:flex lg:w-1/2 relative">
        <div className="absolute inset-0 bg-gradient-to-br from-onyx via-charcoal to-onyx" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-celestial-purple/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col justify-center px-16">
          <Link href="/" className="text-3xl font-serif tracking-wide text-gold mb-8">
            House of Soul
          </Link>
          <h1 className="text-4xl font-serif leading-tight mb-6">
            Begin your
            <br />
            <span className="text-gold">soul journey</span>
          </h1>
          <p className="text-ivory/60 max-w-md">
            Join a refined community seeking spiritual alignment through curated
            guidance, authenticated objects, and trusted wisdom.
          </p>
        </div>
      </div>

      {/* Right side - form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          {/* Mobile logo */}
          <Link
            href="/"
            className="lg:hidden text-2xl font-serif tracking-wide text-gold block text-center mb-12"
          >
            House of Soul
          </Link>

          {/* Profile indicator */}
          {hasProfile && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-8 p-4 bg-gold/5 border border-gold/20 flex items-start gap-3"
            >
              <Sparkles className="w-5 h-5 text-gold flex-shrink-0" />
              <div>
                <p className="text-sm text-gold font-medium">
                  Soul Profile Ready
                </p>
                <p className="text-sm text-ivory/60">
                  Create an account to save your profile and receive personalized
                  insights.
                </p>
              </div>
            </motion.div>
          )}

          <div className="text-center mb-10">
            <h2 className="text-3xl font-serif mb-3">Create Account</h2>
            <p className="text-ivory/60">Join the House of Soul community</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-500/10 border border-red-500/30 text-red-400 text-sm"
              >
                {error}
              </motion.div>
            )}

            <div className="relative">
              <Input
                type="text"
                label="Full Name"
                placeholder="Your name"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                required
              />
              <User className="absolute right-4 top-[42px] w-5 h-5 text-ivory/30" />
            </div>

            <div className="relative">
              <Input
                type="email"
                label="Email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
              <Mail className="absolute right-4 top-[42px] w-5 h-5 text-ivory/30" />
            </div>

            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                hint="At least 8 characters"
                required
                minLength={8}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-[42px] text-ivory/30 hover:text-ivory/60 transition-colors"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <Button
              type="submit"
              variant="gold"
              className="w-full"
              disabled={isLoading}
            >
              {isLoading ? 'Creating account...' : 'Create Account'}
              {!isLoading && <ArrowRight className="w-4 h-4 ml-2" />}
            </Button>

            <p className="text-xs text-ivory/40 text-center">
              By creating an account, you agree to our{' '}
              <Link href="/terms" className="text-gold hover:underline">
                Terms of Service
              </Link>{' '}
              and{' '}
              <Link href="/privacy" className="text-gold hover:underline">
                Privacy Policy
              </Link>
            </p>
          </form>

          <div className="mt-8 text-center">
            <p className="text-ivory/60">
              Already have an account?{' '}
              <Link
                href={`/login${redirect !== '/dashboard' ? `?redirect=${redirect}` : ''}`}
                className="text-gold hover:text-gold/80 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>

          {/* Divider */}
          <div className="mt-8 flex items-center gap-4">
            <div className="flex-1 h-px bg-graphite" />
            <span className="text-sm text-ivory/40">or continue with</span>
            <div className="flex-1 h-px bg-graphite" />
          </div>

          {/* Social login */}
          <div className="mt-6 grid grid-cols-2 gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'google' })}
              className="flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Google
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => supabase.auth.signInWithOAuth({ provider: 'apple' })}
              className="flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z" />
              </svg>
              Apple
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
