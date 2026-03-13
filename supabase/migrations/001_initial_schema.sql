-- ============================================
-- HOUSE OF SOUL - DATABASE SCHEMA
-- Run this in Supabase SQL Editor
-- ============================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (extends Supabase auth.users)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  phone TEXT,
  membership_tier TEXT DEFAULT 'free' CHECK (membership_tier IN ('free', 'essential', 'prive', 'concierge')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- SOUL PROFILES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS soul_profiles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Birth Data
  full_name TEXT NOT NULL,
  date_of_birth DATE NOT NULL,
  time_of_birth TIME,
  place_of_birth TEXT NOT NULL,
  birth_coordinates JSONB, -- {lat, lng, timezone}

  -- Current Context
  current_city TEXT,
  current_coordinates JSONB,

  -- Personal Details
  gender TEXT CHECK (gender IN ('male', 'female', 'non_binary', 'prefer_not_to_say')),
  pronouns TEXT,
  relationship_status TEXT CHECK (relationship_status IN ('single', 'in_relationship', 'married', 'divorced', 'widowed', 'prefer_not_to_say')),

  -- Life Context (arrays for multi-select)
  life_goals TEXT[] DEFAULT '{}',
  pain_points TEXT[] DEFAULT '{}',
  areas_needing_support TEXT[] DEFAULT '{}',

  -- Spiritual Preferences
  spiritual_beliefs TEXT[] DEFAULT '{}',
  modality_openness JSONB DEFAULT '[]', -- [{modality, interest_level}]

  -- Preferences
  budget_tier TEXT DEFAULT 'premium' CHECK (budget_tier IN ('essential', 'premium', 'luxury')),
  style_preferences TEXT[] DEFAULT '{}',
  language_preference TEXT DEFAULT 'en',

  -- AI Generated Content
  soul_archetype TEXT,
  energy_state TEXT,
  ai_summary TEXT,
  recommendations_json JSONB,

  -- Status
  profile_completion INTEGER DEFAULT 0 CHECK (profile_completion >= 0 AND profile_completion <= 100),
  onboarding_step INTEGER DEFAULT 1,
  is_complete BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id)
);

-- ============================================
-- EXPERT CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS expert_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  icon TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default categories
INSERT INTO expert_categories (slug, name, description, display_order) VALUES
  ('astrology', 'Astrology', 'Celestial insights and birth chart analysis', 1),
  ('numerology', 'Numerology', 'Life path and destiny number guidance', 2),
  ('spiritual_guidance', 'Spiritual Guidance', 'Holistic spiritual counseling and mentorship', 3),
  ('energy_healing', 'Energy Healing', 'Reiki, chakra balancing, and energy work', 4),
  ('tarot', 'Tarot', 'Intuitive card readings and divination', 5),
  ('meditation', 'Meditation', 'Guided meditation and mindfulness', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- EXPERTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS experts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  full_name TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  title TEXT NOT NULL,
  bio TEXT NOT NULL,
  long_bio TEXT,
  avatar_url TEXT,
  cover_image_url TEXT,

  -- Categories (array of category slugs)
  categories TEXT[] NOT NULL DEFAULT '{}',
  specializations TEXT[] DEFAULT '{}',

  -- Credentials
  experience_years INTEGER DEFAULT 0,
  credentials TEXT[] DEFAULT '{}',
  lineage TEXT,

  -- Pricing
  session_rate_usd NUMERIC(10, 2) NOT NULL,
  session_duration_minutes INTEGER DEFAULT 60,

  -- Availability
  is_available BOOLEAN DEFAULT TRUE,
  languages TEXT[] DEFAULT '{en}',
  timezone TEXT DEFAULT 'UTC',

  -- Trust
  is_verified BOOLEAN DEFAULT FALSE,
  verification_date TIMESTAMPTZ,
  rating NUMERIC(2, 1) DEFAULT 5.0,
  review_count INTEGER DEFAULT 0,

  -- Status
  status TEXT DEFAULT 'pending_review' CHECK (status IN ('active', 'inactive', 'pending_review')),
  featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- BOOKINGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  expert_id UUID NOT NULL REFERENCES experts(id) ON DELETE CASCADE,

  -- Session Details
  session_type TEXT DEFAULT 'video' CHECK (session_type IN ('video', 'audio', 'chat')),
  scheduled_at TIMESTAMPTZ NOT NULL,
  duration_minutes INTEGER NOT NULL DEFAULT 60,
  timezone TEXT NOT NULL,

  -- Pricing
  amount_usd NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'confirmed', 'completed', 'cancelled', 'no_show')),

  -- Notes
  user_questions TEXT,
  session_notes TEXT,

  -- Feedback
  rating INTEGER CHECK (rating >= 1 AND rating <= 5),
  review TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- PRODUCT CATEGORIES
-- ============================================
CREATE TABLE IF NOT EXISTS product_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  image_url TEXT,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Insert default categories
INSERT INTO product_categories (slug, name, description, display_order) VALUES
  ('gemstones', 'Gemstones', 'Authenticated and certified crystals and gems', 1),
  ('cleansing_kits', 'Cleansing Kits', 'Sage, palo santo, and purification tools', 2),
  ('ritual_essentials', 'Ritual Essentials', 'Candles, ritual tools, and sacred items', 3),
  ('incense_oils', 'Incense & Oils', 'Essential oils and aromatic incense', 4),
  ('apparel', 'Aligned Apparel', 'Energy-aligned clothing and accessories', 5),
  ('bundles', 'Curated Bundles', 'Expertly curated product sets', 6)
ON CONFLICT (slug) DO NOTHING;

-- ============================================
-- PRODUCTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  long_description TEXT,

  -- Category
  category TEXT NOT NULL,
  subcategory TEXT,
  tags TEXT[] DEFAULT '{}',

  -- Pricing
  price_usd NUMERIC(10, 2) NOT NULL,
  compare_at_price_usd NUMERIC(10, 2),
  currency TEXT DEFAULT 'USD',

  -- Inventory
  sku TEXT,
  inventory_quantity INTEGER DEFAULT 0,
  is_in_stock BOOLEAN DEFAULT TRUE,

  -- Media
  images JSONB DEFAULT '[]', -- [{url, alt, is_primary}]

  -- Details
  origin TEXT,
  materials TEXT,
  care_instructions TEXT,

  -- Trust
  authenticity_certificate BOOLEAN DEFAULT FALSE,
  sourcing_details TEXT,

  -- Recommendations
  suited_for TEXT[] DEFAULT '{}', -- life goals, archetypes
  energy_properties TEXT[] DEFAULT '{}',

  -- Status
  status TEXT DEFAULT 'draft' CHECK (status IN ('active', 'draft', 'archived')),
  featured BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ORDERS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS orders (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Pricing
  subtotal_usd NUMERIC(10, 2) NOT NULL,
  shipping_usd NUMERIC(10, 2) DEFAULT 0,
  tax_usd NUMERIC(10, 2) DEFAULT 0,
  total_usd NUMERIC(10, 2) NOT NULL,
  currency TEXT DEFAULT 'USD',

  -- Shipping
  shipping_address JSONB NOT NULL,
  shipping_method TEXT,
  tracking_number TEXT,

  -- Status
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'processing', 'shipped', 'delivered', 'cancelled', 'refunded')),

  -- Payment
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'paid', 'failed', 'refunded')),
  payment_method TEXT,
  stripe_payment_intent_id TEXT,

  -- Notes
  gift_message TEXT,
  internal_notes TEXT,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- ORDER ITEMS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS order_items (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  product_id UUID NOT NULL REFERENCES products(id),
  product_name TEXT NOT NULL,
  quantity INTEGER NOT NULL DEFAULT 1,
  price_usd NUMERIC(10, 2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- RECOMMENDATIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS recommendations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Type
  recommendation_type TEXT NOT NULL CHECK (recommendation_type IN ('expert', 'product', 'ritual', 'timing', 'color', 'material', 'practice')),

  -- Content
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  reason TEXT NOT NULL,

  -- Reference
  expert_id UUID REFERENCES experts(id) ON DELETE SET NULL,
  product_id UUID REFERENCES products(id) ON DELETE SET NULL,

  -- Priority
  priority INTEGER DEFAULT 50,
  confidence NUMERIC(3, 2) DEFAULT 0.8,

  -- Timing
  valid_from TIMESTAMPTZ,
  valid_until TIMESTAMPTZ,

  -- Status
  is_viewed BOOLEAN DEFAULT FALSE,
  is_actioned BOOLEAN DEFAULT FALSE,
  is_dismissed BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- REVIEWS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS reviews (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  -- Reference
  expert_id UUID REFERENCES experts(id) ON DELETE CASCADE,
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  booking_id UUID REFERENCES bookings(id) ON DELETE SET NULL,

  -- Content
  rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  content TEXT NOT NULL,

  -- Status
  is_verified BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- ============================================
-- MEMBERSHIPS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS memberships (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,

  tier TEXT NOT NULL CHECK (tier IN ('essential', 'prive', 'concierge')),

  -- Billing
  price_usd NUMERIC(10, 2) NOT NULL,
  billing_cycle TEXT DEFAULT 'monthly' CHECK (billing_cycle IN ('monthly', 'yearly')),
  stripe_subscription_id TEXT,

  -- Status
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'cancelled', 'past_due')),
  current_period_start TIMESTAMPTZ NOT NULL,
  current_period_end TIMESTAMPTZ NOT NULL,

  -- Benefits
  monthly_credits INTEGER DEFAULT 0,
  credits_remaining INTEGER DEFAULT 0,

  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),

  UNIQUE(user_id)
);

-- ============================================
-- INDEXES
-- ============================================
CREATE INDEX IF NOT EXISTS idx_soul_profiles_user ON soul_profiles(user_id);
CREATE INDEX IF NOT EXISTS idx_experts_status ON experts(status) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_experts_categories ON experts USING GIN(categories);
CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_expert ON bookings(expert_id);
CREATE INDEX IF NOT EXISTS idx_bookings_scheduled ON bookings(scheduled_at);
CREATE INDEX IF NOT EXISTS idx_products_category ON products(category) WHERE status = 'active';
CREATE INDEX IF NOT EXISTS idx_products_status ON products(status);
CREATE INDEX IF NOT EXISTS idx_orders_user ON orders(user_id);
CREATE INDEX IF NOT EXISTS idx_recommendations_user ON recommendations(user_id);
CREATE INDEX IF NOT EXISTS idx_reviews_expert ON reviews(expert_id) WHERE is_published = TRUE;
CREATE INDEX IF NOT EXISTS idx_reviews_product ON reviews(product_id) WHERE is_published = TRUE;

-- ============================================
-- ROW LEVEL SECURITY
-- ============================================
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE soul_profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE recommendations ENABLE ROW LEVEL SECURITY;
ALTER TABLE reviews ENABLE ROW LEVEL SECURITY;
ALTER TABLE memberships ENABLE ROW LEVEL SECURITY;

-- Users can read/update their own data
CREATE POLICY "Users can view own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

-- Soul profiles policies
CREATE POLICY "Users can view own soul profile" ON soul_profiles
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own soul profile" ON soul_profiles
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own soul profile" ON soul_profiles
  FOR UPDATE USING (auth.uid() = user_id);

-- Experts - public read
CREATE POLICY "Anyone can view active experts" ON experts
  FOR SELECT USING (status = 'active');

-- Bookings policies
CREATE POLICY "Users can view own bookings" ON bookings
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own bookings" ON bookings
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own bookings" ON bookings
  FOR UPDATE USING (auth.uid() = user_id);

-- Products - public read
CREATE POLICY "Anyone can view active products" ON products
  FOR SELECT USING (status = 'active');

-- Orders policies
CREATE POLICY "Users can view own orders" ON orders
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own orders" ON orders
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Recommendations policies
CREATE POLICY "Users can view own recommendations" ON recommendations
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can update own recommendations" ON recommendations
  FOR UPDATE USING (auth.uid() = user_id);

-- Reviews policies
CREATE POLICY "Anyone can view published reviews" ON reviews
  FOR SELECT USING (is_published = TRUE);

CREATE POLICY "Users can insert own reviews" ON reviews
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reviews" ON reviews
  FOR UPDATE USING (auth.uid() = user_id);

-- Memberships policies
CREATE POLICY "Users can view own membership" ON memberships
  FOR SELECT USING (auth.uid() = user_id);

-- ============================================
-- FUNCTIONS
-- ============================================

-- Auto-update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply to tables
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_soul_profiles_updated_at
  BEFORE UPDATE ON soul_profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_experts_updated_at
  BEFORE UPDATE ON experts
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_bookings_updated_at
  BEFORE UPDATE ON bookings
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_products_updated_at
  BEFORE UPDATE ON products
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_memberships_updated_at
  BEFORE UPDATE ON memberships
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- ============================================
-- AUTO-CREATE USER PROFILE ON SIGNUP
-- ============================================
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION handle_new_user();
