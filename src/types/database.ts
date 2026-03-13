// ============================================
// HOUSE OF SOUL - DATABASE TYPES
// ============================================

// User & Profile Types
export interface User {
  id: string;
  email: string;
  full_name: string | null;
  avatar_url: string | null;
  phone: string | null;
  membership_tier: MembershipTier;
  created_at: string;
  updated_at: string;
}

export type MembershipTier = 'free' | 'essential' | 'prive' | 'concierge';

// Soul Profile Types
export interface SoulProfile {
  id: string;
  user_id: string;

  // Birth Data
  full_name: string;
  date_of_birth: string;
  time_of_birth: string | null;
  place_of_birth: string;
  birth_coordinates: GeoCoordinates | null;

  // Current Context
  current_city: string | null;
  current_coordinates: GeoCoordinates | null;

  // Personal Details
  gender: Gender | null;
  pronouns: string | null;
  relationship_status: RelationshipStatus | null;

  // Life Context
  life_goals: LifeGoal[];
  pain_points: PainPoint[];
  areas_needing_support: SupportArea[];

  // Spiritual Preferences
  spiritual_beliefs: SpiritualBelief[];
  modality_openness: ModalityPreference[];

  // Preferences
  budget_tier: BudgetTier;
  style_preferences: StylePreference[];
  language_preference: string;

  // AI Generated
  soul_archetype: string | null;
  energy_state: string | null;
  ai_summary: string | null;
  recommendations_json: any | null;

  // Status
  profile_completion: number; // 0-100
  onboarding_step: number;
  is_complete: boolean;

  created_at: string;
  updated_at: string;
}

export interface GeoCoordinates {
  lat: number;
  lng: number;
  timezone?: string;
}

export type Gender = 'male' | 'female' | 'non_binary' | 'prefer_not_to_say';

export type RelationshipStatus =
  | 'single'
  | 'in_relationship'
  | 'married'
  | 'divorced'
  | 'widowed'
  | 'prefer_not_to_say';

export type LifeGoal =
  | 'career_growth'
  | 'love_relationship'
  | 'financial_abundance'
  | 'health_wellness'
  | 'spiritual_growth'
  | 'life_purpose'
  | 'creativity'
  | 'peace_clarity'
  | 'family_harmony'
  | 'self_discovery';

export type PainPoint =
  | 'anxiety_stress'
  | 'relationship_issues'
  | 'career_confusion'
  | 'financial_struggles'
  | 'health_concerns'
  | 'lack_of_direction'
  | 'grief_loss'
  | 'self_doubt'
  | 'burnout'
  | 'spiritual_disconnection';

export type SupportArea =
  | 'timing_decisions'
  | 'relationship_guidance'
  | 'career_path'
  | 'health_alignment'
  | 'spiritual_practice'
  | 'energy_clearing'
  | 'life_transitions'
  | 'daily_rituals'
  | 'protection_grounding'
  | 'manifestation';

export type SpiritualBelief =
  | 'astrology'
  | 'numerology'
  | 'energy_healing'
  | 'meditation'
  | 'crystals'
  | 'tarot'
  | 'ancestral'
  | 'yoga'
  | 'ayurveda'
  | 'open_exploring';

export type ModalityPreference = {
  modality: Modality;
  interest_level: 'high' | 'medium' | 'low' | 'not_interested';
};

export type Modality =
  | 'astrology'
  | 'numerology'
  | 'spiritual_guidance'
  | 'energy_healing'
  | 'tarot'
  | 'meditation';

export type BudgetTier = 'essential' | 'premium' | 'luxury';

export type StylePreference =
  | 'minimalist'
  | 'traditional'
  | 'modern'
  | 'bohemian'
  | 'classic_elegant';

// Expert Types
export interface Expert {
  id: string;
  full_name: string;
  slug: string;
  title: string;
  bio: string;
  long_bio: string | null;
  avatar_url: string;
  cover_image_url: string | null;

  // Categories
  categories: ExpertCategory[];
  specializations: string[];

  // Credentials
  experience_years: number;
  credentials: string[];
  lineage: string | null;

  // Pricing
  session_rate_usd: number;
  session_duration_minutes: number;

  // Availability
  is_available: boolean;
  languages: string[];
  timezone: string;

  // Trust
  is_verified: boolean;
  verification_date: string | null;
  rating: number;
  review_count: number;

  // Status
  status: 'active' | 'inactive' | 'pending_review';
  featured: boolean;

  created_at: string;
  updated_at: string;
}

export type ExpertCategory =
  | 'astrology'
  | 'numerology'
  | 'spiritual_guidance'
  | 'energy_healing'
  | 'tarot'
  | 'meditation';

// Booking Types
export interface Booking {
  id: string;
  user_id: string;
  expert_id: string;

  // Session Details
  session_type: SessionType;
  scheduled_at: string;
  duration_minutes: number;
  timezone: string;

  // Pricing
  amount_usd: number;
  currency: string;

  // Status
  status: BookingStatus;

  // Notes
  user_questions: string | null;
  session_notes: string | null;

  // Feedback
  rating: number | null;
  review: string | null;

  created_at: string;
  updated_at: string;
}

export type SessionType = 'video' | 'audio' | 'chat';
export type BookingStatus =
  | 'pending'
  | 'confirmed'
  | 'completed'
  | 'cancelled'
  | 'no_show';

// Product Types
export interface Product {
  id: string;
  slug: string;
  name: string;
  description: string;
  long_description: string | null;

  // Category
  category: ProductCategory;
  subcategory: string | null;
  tags: string[];

  // Pricing
  price_usd: number;
  compare_at_price_usd: number | null;
  currency: string;

  // Inventory
  sku: string | null;
  inventory_quantity: number;
  is_in_stock: boolean;

  // Media
  images: ProductImage[];

  // Details
  origin: string | null;
  materials: string | null;
  care_instructions: string | null;

  // Trust
  authenticity_certificate: boolean;
  sourcing_details: string | null;

  // Recommendations
  suited_for: string[];
  energy_properties: string[];

  // Status
  status: 'active' | 'draft' | 'archived';
  featured: boolean;

  created_at: string;
  updated_at: string;
}

export type ProductCategory =
  | 'gemstones'
  | 'cleansing_kits'
  | 'ritual_essentials'
  | 'incense_oils'
  | 'apparel'
  | 'accessories'
  | 'bundles';

export interface ProductImage {
  url: string;
  alt: string;
  is_primary: boolean;
}

// Order Types
export interface Order {
  id: string;
  user_id: string;

  // Items
  items: OrderItem[];

  // Pricing
  subtotal_usd: number;
  shipping_usd: number;
  tax_usd: number;
  total_usd: number;
  currency: string;

  // Shipping
  shipping_address: Address;
  shipping_method: string | null;
  tracking_number: string | null;

  // Status
  status: OrderStatus;

  // Payment
  payment_status: PaymentStatus;
  payment_method: string | null;
  stripe_payment_intent_id: string | null;

  // Notes
  gift_message: string | null;
  internal_notes: string | null;

  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  product_id: string;
  product_name: string;
  quantity: number;
  price_usd: number;
}

export interface Address {
  name: string;
  line1: string;
  line2: string | null;
  city: string;
  state: string | null;
  postal_code: string;
  country: string;
  phone: string | null;
}

export type OrderStatus =
  | 'pending'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus =
  | 'pending'
  | 'paid'
  | 'failed'
  | 'refunded';

// Recommendation Types
export interface Recommendation {
  id: string;
  user_id: string;

  // Type
  recommendation_type: RecommendationType;

  // Content
  title: string;
  description: string;
  reason: string; // Why this was recommended

  // Reference
  expert_id: string | null;
  product_id: string | null;

  // Priority
  priority: number;
  confidence: number; // 0-1

  // Timing
  valid_from: string | null;
  valid_until: string | null;

  // Status
  is_viewed: boolean;
  is_actioned: boolean;
  is_dismissed: boolean;

  created_at: string;
}

export type RecommendationType =
  | 'expert'
  | 'product'
  | 'ritual'
  | 'timing'
  | 'color'
  | 'material'
  | 'practice';

// Review Types
export interface Review {
  id: string;
  user_id: string;

  // Reference
  expert_id: string | null;
  product_id: string | null;
  booking_id: string | null;

  // Content
  rating: number; // 1-5
  title: string | null;
  content: string;

  // Status
  is_verified: boolean;
  is_published: boolean;

  created_at: string;
}

// Membership Types
export interface Membership {
  id: string;
  user_id: string;

  tier: MembershipTier;

  // Billing
  price_usd: number;
  billing_cycle: 'monthly' | 'yearly';
  stripe_subscription_id: string | null;

  // Status
  status: 'active' | 'cancelled' | 'past_due';
  current_period_start: string;
  current_period_end: string;

  // Benefits
  monthly_credits: number;
  credits_remaining: number;

  created_at: string;
  updated_at: string;
}

// Onboarding Step Data
export interface OnboardingStepData {
  step: number;
  title: string;
  subtitle: string;
  fields: OnboardingField[];
}

export interface OnboardingField {
  name: string;
  type: 'text' | 'date' | 'time' | 'select' | 'multiselect' | 'location' | 'textarea';
  label: string;
  placeholder?: string;
  options?: { value: string; label: string; description?: string }[];
  required?: boolean;
}

// Extended types with relations
export interface ExpertWithBookings extends Expert {
  bookings?: Booking[];
}

export interface ProductWithReviews extends Product {
  reviews?: Review[];
}

export interface UserWithProfile extends User {
  soul_profile?: SoulProfile;
  membership?: Membership;
}
