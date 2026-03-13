'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles, Shield, Heart, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function Home() {
  return (
    <main className="min-h-screen bg-onyx text-ivory">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-onyx/90 backdrop-blur-sm border-b border-graphite/30">
        <div className="container-luxury flex items-center justify-between h-20">
          <Link href="/" className="text-2xl font-serif tracking-wide text-gold">
            House of Soul
          </Link>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#guidance" className="text-sm tracking-wider text-ivory/80 hover:text-gold transition-colors">
              Guidance
            </Link>
            <Link href="#objects" className="text-sm tracking-wider text-ivory/80 hover:text-gold transition-colors">
              Objects
            </Link>
            <Link href="#membership" className="text-sm tracking-wider text-ivory/80 hover:text-gold transition-colors">
              Membership
            </Link>
            <Button variant="outline" size="sm">
              Begin
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center px-6 pt-20">
        {/* Subtle background gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-onyx via-charcoal/20 to-onyx" />

        {/* Decorative elements */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-celestial-purple/10 rounded-full blur-3xl" />

        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-gold text-sm tracking-[0.3em] uppercase mb-6"
          >
            Luxury for the Soul
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-serif leading-tight mb-8"
          >
            One refined destination
            <br />
            <span className="text-gold">for your soul&apos;s</span>
            <br />
            elevation
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-lg md:text-xl text-ivory/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          >
            Curated spiritual guidance, authenticated objects, and personalized rituals.
            Deeply understood. Elegantly delivered.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <Link href="/profile">
              <Button variant="gold" size="lg">
                Begin Your Soul Profile
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Button variant="outline" size="lg">
              Explore
            </Button>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 border border-gold/30 rounded-full flex items-start justify-center pt-2"
          >
            <div className="w-1 h-2 bg-gold rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 px-6 bg-charcoal/30">
        <div className="container-luxury">
          <div className="max-w-4xl mx-auto text-center">
            <motion.p
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              className="text-gold text-sm tracking-[0.3em] uppercase mb-6"
            >
              Our Philosophy
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-4xl md:text-5xl font-serif mb-8"
            >
              The body is temporary.
              <br />
              <span className="text-gold">The soul is enduring.</span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="text-lg text-ivory/60 leading-relaxed"
            >
              Most luxury serves the body, status, or comfort. We serve the soul.
              <br />
              Few choices. Perfectly chosen. Deeply personal. Beautifully trusted.
            </motion.p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 px-6">
        <div className="container-luxury">
          <div className="text-center mb-20">
            <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
              The Journey
            </p>
            <h2 className="text-4xl md:text-5xl font-serif">
              How it works
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                step: '01',
                title: 'Soul Profile',
                description:
                  'Share your birth details, life goals, and spiritual openness. We create your unique energetic blueprint.',
                icon: Sparkles,
              },
              {
                step: '02',
                title: 'Personalized Insights',
                description:
                  'Receive AI-powered interpretations combined with expert wisdom. Understand your patterns and potential.',
                icon: Star,
              },
              {
                step: '03',
                title: 'Aligned Action',
                description:
                  'Book trusted guides, select authenticated objects, and follow recommended rituals for your journey.',
                icon: Heart,
              },
            ].map((item, index) => (
              <motion.div
                key={item.step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative p-8 border border-graphite hover:border-gold transition-colors duration-500"
              >
                <span className="text-6xl font-serif text-graphite/50">{item.step}</span>
                <div className="mt-4">
                  <item.icon className="w-6 h-6 text-gold mb-4" />
                  <h3 className="text-xl font-serif mb-3">{item.title}</h3>
                  <p className="text-ivory/60 leading-relaxed">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Preview */}
      <section id="guidance" className="py-32 px-6 bg-charcoal/30">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
                Curated Guidance
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                Trusted experts.
                <br />
                Verified wisdom.
              </h2>
              <p className="text-ivory/60 leading-relaxed mb-8">
                Every astrologer, numerologist, and spiritual guide on our platform
                is personally vetted. Their credentials, lineage, and approach are
                reviewed to ensure you receive only the highest quality guidance.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold" />
                  <span>Verified Experts</span>
                </div>
                <div className="flex items-center gap-2">
                  <Star className="w-4 h-4 text-gold" />
                  <span>Curated Selection</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {['Astrology', 'Numerology', 'Spiritual Guidance', 'Energy Healing'].map(
                (service, index) => (
                  <motion.div
                    key={service}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square bg-graphite/50 border border-graphite hover:border-gold transition-colors p-6 flex items-end"
                  >
                    <span className="font-serif text-lg">{service}</span>
                  </motion.div>
                )
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Objects Preview */}
      <section id="objects" className="py-32 px-6">
        <div className="container-luxury">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="order-2 md:order-1 grid grid-cols-2 gap-4">
              {['Gemstones', 'Cleansing Kits', 'Ritual Essentials', 'Aligned Apparel'].map(
                (product, index) => (
                  <motion.div
                    key={product}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="aspect-square bg-charcoal border border-graphite hover:border-gold transition-colors p-6 flex items-end"
                  >
                    <span className="font-serif text-lg">{product}</span>
                  </motion.div>
                )
              )}
            </div>
            <div className="order-1 md:order-2">
              <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
                Sacred Objects
              </p>
              <h2 className="text-4xl md:text-5xl font-serif mb-8">
                Authenticated.
                <br />
                Sourced with care.
              </h2>
              <p className="text-ivory/60 leading-relaxed mb-8">
                Every gemstone comes with certification. Every ritual tool is sourced
                with intention. We believe in transparency, authenticity, and the
                power of objects aligned with your energy.
              </p>
              <div className="flex items-center gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Shield className="w-4 h-4 text-gold" />
                  <span>Certified Gems</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-gold" />
                  <span>Ethical Sourcing</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Membership */}
      <section id="membership" className="py-32 px-6 bg-charcoal/30">
        <div className="container-luxury text-center">
          <p className="text-gold text-sm tracking-[0.3em] uppercase mb-6">
            Membership
          </p>
          <h2 className="text-4xl md:text-5xl font-serif mb-8 max-w-3xl mx-auto">
            Join the inner circle
          </h2>
          <p className="text-ivory/60 leading-relaxed mb-12 max-w-2xl mx-auto">
            Members receive monthly energy updates, priority access to trusted advisors,
            exclusive product drops, and personalized ritual calendars.
          </p>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              {
                tier: 'Essential',
                price: '$29',
                features: ['Soul Profile Report', 'Monthly Insights', 'Member Pricing'],
              },
              {
                tier: 'Privé',
                price: '$99',
                features: ['Everything in Essential', 'Priority Expert Access', 'Exclusive Drops', 'Ritual Calendar'],
                featured: true,
              },
              {
                tier: 'Concierge',
                price: '$499',
                features: ['Everything in Privé', 'Personal Concierge', 'Bespoke Guidance', 'White Glove Service'],
              },
            ].map((plan, index) => (
              <motion.div
                key={plan.tier}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className={`p-8 border ${
                  plan.featured ? 'border-gold bg-gold/5' : 'border-graphite'
                }`}
              >
                <h3 className="text-xl font-serif mb-2">{plan.tier}</h3>
                <p className="text-3xl font-serif text-gold mb-6">
                  {plan.price}
                  <span className="text-sm text-ivory/40">/month</span>
                </p>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="text-sm text-ivory/60">
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button
                  variant={plan.featured ? 'gold' : 'outline'}
                  className="w-full"
                >
                  Select
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="container-luxury text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-4xl md:text-6xl font-serif mb-8"
          >
            Begin your journey
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ivory/60 text-lg mb-12 max-w-xl mx-auto"
          >
            Your soul profile takes just a few minutes to complete.
            Receive personalized insights immediately.
          </motion.p>
          <Link href="/profile">
            <Button variant="gold" size="lg">
              Begin Your Soul Profile
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-16 px-6 border-t border-graphite/30">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <Link href="/" className="text-2xl font-serif tracking-wide text-gold">
              House of Soul
            </Link>
            <div className="flex items-center gap-8 text-sm text-ivory/60">
              <Link href="/privacy" className="hover:text-gold transition-colors">
                Privacy
              </Link>
              <Link href="/terms" className="hover:text-gold transition-colors">
                Terms
              </Link>
              <Link href="/contact" className="hover:text-gold transition-colors">
                Contact
              </Link>
            </div>
            <p className="text-sm text-ivory/40">
              © 2025 House of Soul. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
}
