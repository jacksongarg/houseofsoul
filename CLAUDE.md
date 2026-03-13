# House of Soul

## Overview
A premium mobile-first spiritual concierge platform that curates the world's best spiritual guidance, authenticated ritual products, energy-aligned fashion, gems, numerology, and astrology into one trusted luxury destination.

## Tech Stack
- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS v4
- **State**: Zustand (with persist middleware)
- **Auth & Database**: Supabase (PostgreSQL + Auth + Storage)
- **AI**: Claude API (Anthropic) for soul insights and personalization
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Payments**: Stripe (to be added)
- **Deployment**: Vercel (https://houseofsoul-phi.vercel.app)

## Brand Essence
- **Core belief**: The body is temporary. The soul is enduring.
- **Positioning**: Luxury for the Soul
- **Feeling**: Sacred, Elevated, Calm, Discerning, Rare, Trusted, Eternal, Intimate

## Design System
- **Colors**: Deep neutrals, warm whites, stone, gold (#C9A962), onyx (#1A1A1A), ivory (#FFFEF7), muted celestial accents
- **Typography**: Premium serif (Playfair Display) + modern sans (Inter)
- **Aesthetic**: Aman-level calm + Apple-level clarity
- **Motion**: Slow, elegant transitions

## Project Structure
```
src/
├── app/
│   ├── (auth)/           # Auth routes (login, signup)
│   │   ├── login/        # Login page with Suspense
│   │   └── signup/       # Signup page with profile integration
│   ├── (main)/           # Main app routes
│   │   ├── profile/      # Soul Profile onboarding
│   │   ├── guidance/     # Expert recommendations
│   │   ├── shop/         # Curated products
│   │   ├── dashboard/    # Personal dashboard
│   │   └── experts/      # Expert directory
│   ├── admin/            # Admin panel
│   └── api/              # API routes
├── components/
│   ├── ui/               # Base UI components (Button, Card, Input)
│   ├── onboarding/       # Soul Profile onboarding steps
│   │   ├── OnboardingLayout.tsx
│   │   ├── StepIndicator.tsx
│   │   └── steps/        # Individual step components
│   ├── experts/          # Expert-related components
│   ├── shop/             # Shop components
│   ├── dashboard/        # Dashboard components
│   └── layout/           # Layout components
├── lib/
│   ├── supabase.ts       # Browser Supabase client
│   ├── supabase-server.ts # Server Supabase client
│   └── utils.ts          # Utilities
├── stores/
│   ├── auth-store.ts     # Auth state with Zustand
│   └── profile-store.ts  # Soul profile state with Zustand
├── hooks/
└── types/
    └── database.ts       # TypeScript types
```

## Current Status
- [x] Project setup with Next.js 16 + Tailwind v4
- [x] Luxury design system (colors, typography, animations)
- [x] UI components (Button, Card, Input)
- [x] Landing page with all sections
- [x] Database schema (migration 001) - APPLIED
- [x] Deployed to Vercel
- [x] Soul Profile onboarding (5-step flow)
- [x] Auth pages (login/signup with Supabase)
- [x] Zustand stores (auth, profile)
- [ ] AI insight engine
- [ ] Expert directory
- [ ] Curated shop
- [ ] Personal dashboard
- [ ] Admin panel

## Soul Profile Onboarding (Complete)
5-step ritual-like intake:
1. **Birth Data** - Name, date, time, place of birth
2. **About You** - Gender, pronouns, city, relationship status
3. **Life Goals** - Goals, pain points, support areas (multi-select chips)
4. **Spiritual Path** - Beliefs, modality interest levels
5. **Preferences** - Budget tier, aesthetic style

Features:
- Animated step transitions (Framer Motion)
- Progress indicator (mobile + desktop)
- Data persisted in localStorage via Zustand
- Seamless signup integration (profile saved on account creation)

## Database Tables
- `users` - Extended user profiles
- `soul_profiles` - Birth data, goals, preferences
- `experts` - Verified spiritual practitioners
- `expert_categories` - Astrology, numerology, etc.
- `bookings` - Session bookings
- `products` - Curated items
- `product_categories` - Gems, rituals, cleansing
- `orders` - Purchase orders
- `recommendations` - AI-generated recommendations
- `memberships` - Subscription tiers

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://ruoihfjmhpiyxxiwcbwa.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=<configured>
SUPABASE_SERVICE_ROLE_KEY=<configured>
ANTHROPIC_API_KEY=<to be added>
STRIPE_SECRET_KEY=<to be added>
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=<to be added>
```

## Recent Session (March 13, 2025)
### Initial Setup
- Created new House of Soul project
- Implemented luxury design system based on PRD
- Built complete landing page with all sections
- Created comprehensive database schema
- Deployed to Vercel

### Soul Profile Onboarding
- Created Zustand stores (auth-store, profile-store)
- Built 5-step onboarding components:
  - BirthDataStep, PersonalContextStep, LifeGoalsStep
  - SpiritualPathStep, PreferencesStep
- Created OnboardingLayout with animated transitions
- Built StepIndicator (mobile + desktop variants)
- Created auth pages (login/signup) with Supabase integration
- Fixed Suspense boundary for useSearchParams
- Split supabase.ts into client/server files

## Next Steps
1. Add ANTHROPIC_API_KEY to .env.local
2. Build AI insight engine (soul archetype generation)
3. Create personal dashboard
4. Build expert directory and booking system
5. Create curated shop

## Commands
```bash
npm run dev      # Start dev server
npm run build    # Production build
npm run lint     # ESLint
```
