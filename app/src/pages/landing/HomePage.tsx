import { Link } from 'react-router-dom';
import { ArrowRight, Zap, Brain, Target, Lock, TrendingUp, Star, Check } from 'lucide-react';

export default function HomePage() {
  return (
    <div>
      {/* ── HERO ── */}
      <section className="relative min-h-screen flex items-center pt-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#2EE9A8]/8 via-transparent to-transparent" />
        <div className="absolute top-1/3 right-0 w-[600px] h-[600px] bg-[#2EE9A8]/5 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-5 lg:px-10 w-full py-20">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left — copy */}
            <div>
              <span className="micro-label mb-5 block">AutoSave AI · Kenya</span>
              <h1 className="headline-xl text-[#F4F6F8] mb-6">
                Save without<br /><span className="text-gradient">thinking.</span>
              </h1>
              <p className="body-text max-w-lg mb-8">
                AutoSave AI connects to M-Pesa and silently saves money in the background based on your spending behavior. You won't feel it leaving — but you'll feel it when it accumulates.
              </p>
              <div className="flex flex-wrap gap-3 mb-10">
                <Link to="/waitlist" className="btn-primary flex items-center gap-2">
                  Join the waitlist <ArrowRight size={18} />
                </Link>
                <Link to="/how-it-works" className="btn-secondary flex items-center gap-2">
                  See how it works
                </Link>
              </div>
              <div className="flex flex-wrap gap-6">
                {[['50K+', 'Active Savers'], ['KES 500M+', 'Total Saved'], ['4.9/5', 'App Rating']].map(([v, l]) => (
                  <div key={l}>
                    <p className="text-[#2EE9A8] font-bold text-xl">{v}</p>
                    <p className="text-[#A6AFBA] text-xs">{l}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right — images collage */}
            <div className="relative h-[520px] hidden lg:block">
              {/* Main hero image */}
              <div className="absolute right-0 top-0 w-[58%] h-[62%] rounded-[24px] overflow-hidden border border-white/10">
                <img src="/images/hero-family.jpg" alt="Family saving together" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 to-transparent" />
              </div>
              {/* M-Pesa user */}
              <div className="absolute left-0 top-[15%] w-[44%] h-[50%] rounded-[24px] overflow-hidden border border-white/10">
                <img src="/images/mpesa-user.jpg" alt="M-Pesa user" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/40 to-transparent" />
              </div>
              {/* App mockup */}
              <div className="absolute right-[5%] bottom-0 w-[42%] h-[42%] rounded-[24px] overflow-hidden border border-white/10">
                <img src="/images/app-mockup.jpg" alt="AutoSave app" className="w-full h-full object-cover" />
              </div>
              {/* Floating savings card */}
              <div className="absolute left-[2%] bottom-[8%] bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] rounded-2xl p-4 shadow-2xl">
                <p className="text-[#0B0D10]/70 text-[10px] font-mono uppercase tracking-wider mb-1">AutoSaved today</p>
                <p className="text-[#0B0D10] text-2xl font-bold">KES 250</p>
                <p className="text-[#0B0D10]/60 text-xs mt-0.5">While you were buying lunch 😎</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURES ── */}
      <section id="features" className="py-24 relative">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-16">
            <span className="micro-label mb-4 block">Features</span>
            <h2 className="headline-lg text-[#F4F6F8] mb-4">Everything you need to <span className="text-gradient">save smarter</span></h2>
            <p className="body-text max-w-2xl mx-auto">Not a wallet. Not a bank. A financial behavior engine that works while you live your life.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Feature 1 — big card with image */}
            <div className="card-glass overflow-hidden">
              <div className="h-52 overflow-hidden">
                <img src="/images/mobile-payment.jpg" alt="Mobile payment" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] to-transparent" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-[#2EE9A8]/10 flex items-center justify-center mb-3">
                  <Zap size={20} className="text-[#2EE9A8]" />
                </div>
                <h3 className="text-[#F4F6F8] font-semibold text-lg mb-2">Round-Up Saving</h3>
                <p className="text-[#A6AFBA] text-sm leading-relaxed">Spend KES 270 → save KES 30. Every transaction rounds up and the difference goes straight to savings. Simple, addictive, effortless.</p>
              </div>
            </div>

            {/* Feature 2 — big card with image */}
            <div className="card-glass overflow-hidden">
              <div className="h-52 overflow-hidden">
                <img src="/images/kenyan-businesswoman.jpg" alt="Kenyan businesswoman" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] to-transparent" />
              </div>
              <div className="p-6">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center mb-3">
                  <Brain size={20} className="text-blue-400" />
                </div>
                <h3 className="text-[#F4F6F8] font-semibold text-lg mb-2">AI Behavior Engine</h3>
                <p className="text-[#A6AFBA] text-sm leading-relaxed">The AI reads your income patterns, spending habits, and balance trends. It saves only when it's safe — never when you're running low.</p>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { icon: Target, color: 'text-yellow-400', bg: 'bg-yellow-400/10', title: 'Goal-Based Saving', desc: 'Rent, laptop, emergency fund — set targets and watch them fill up on autopilot.' },
              { icon: Lock, color: 'text-purple-400', bg: 'bg-purple-400/10', title: 'Locked Savings', desc: 'Lock goals until they\'re complete. Prevent impulsive withdrawals and actually reach your targets.' },
              { icon: TrendingUp, color: 'text-[#2EE9A8]', bg: 'bg-[#2EE9A8]/10', title: 'Behavior Dashboard', desc: '"You saved KES 3,200 this month without trying." Visual charts = dopamine.' },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card-glass p-6">
                <div className={`w-10 h-10 rounded-xl ${bg} flex items-center justify-center mb-3`}>
                  <Icon size={20} className={color} />
                </div>
                <h3 className="text-[#F4F6F8] font-semibold mb-2">{title}</h3>
                <p className="text-[#A6AFBA] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SOCIAL PROOF ── */}
      <section className="py-24 bg-[#0F1115]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="text-center mb-14">
            <span className="micro-label mb-4 block">Testimonials</span>
            <h2 className="headline-lg text-[#F4F6F8] mb-4">Loved by <span className="text-gradient">Kenyans</span></h2>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { img: '/images/testimonial-mama.jpg', name: 'Wanjiku M.', role: 'Small Business Owner, Nairobi', quote: 'I run a small kiosk and without even thinking, I\'ve saved over KES 50,000 in 3 months. AutoSave just works.' },
              { img: '/images/testimonial-man.jpg', name: 'James Ochieng', role: 'Software Developer, Nairobi', quote: 'The AI is incredibly smart. It knows when I have extra cash and saves accordingly, but never touches my money when things are tight.' },
              { img: '/images/testimonial-woman.jpg', name: 'Amina Hassan', role: 'Marketing Manager, Mombasa', quote: 'My emergency fund grew without me noticing! It connects directly to M-Pesa and just works in the background.' },
            ].map(({ img, name, role, quote }) => (
              <div key={name} className="card-glass p-6 flex flex-col">
                <div className="flex gap-1 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={14} className="text-[#2EE9A8] fill-[#2EE9A8]" />)}
                </div>
                <p className="text-[#F4F6F8]/90 text-sm leading-relaxed flex-1 mb-5">"{quote}"</p>
                <div className="flex items-center gap-3">
                  <img src={img} alt={name} className="w-11 h-11 rounded-full object-cover border-2 border-[#2EE9A8]/30" />
                  <div>
                    <p className="text-[#F4F6F8] font-medium text-sm">{name}</p>
                    <p className="text-[#A6AFBA] text-xs">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAMILY SAVING BANNER ── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="rounded-[32px] overflow-hidden relative">
            <img src="/images/family-saving.jpg" alt="Family saving together" className="w-full h-72 object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/90 via-[#0B0D10]/60 to-transparent flex items-center">
              <div className="px-10 max-w-lg">
                <span className="micro-label mb-3 block">For every Kenyan</span>
                <h2 className="text-3xl font-bold text-[#F4F6F8] mb-4 leading-tight">Building financial freedom, one shilling at a time.</h2>
                <Link to="/waitlist" className="btn-primary inline-flex items-center gap-2">
                  Start saving free <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRICING PREVIEW ── */}
      <section className="py-24 bg-[#0F1115]">
        <div className="max-w-7xl mx-auto px-5 lg:px-10 text-center">
          <span className="micro-label mb-4 block">Pricing</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Simple, <span className="text-gradient">transparent</span> pricing</h2>
          <p className="body-text max-w-xl mx-auto mb-12">Start free. Upgrade when you're ready. No hidden fees.</p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: 'Basic', price: 'Free', period: 'forever', features: ['Round-up savings', 'Basic auto-save rules', '1 savings goal', 'Standard withdrawals'], cta: 'Get started', highlight: false },
              { name: 'Premium', price: 'KES 299', period: '/month', features: ['Everything in Basic', 'Advanced AI insights', 'Unlimited goals', 'Priority withdrawals', 'Smart spending analysis'], cta: 'Start free trial', highlight: true },
              { name: 'Business', price: 'Custom', period: 'pricing', features: ['Everything in Premium', 'Group savings pools', 'Team dashboards', 'API access', 'Dedicated manager'], cta: 'Contact sales', highlight: false },
            ].map(({ name, price, period, features, cta, highlight }) => (
              <div key={name} className={`rounded-[24px] p-6 flex flex-col text-left relative ${highlight ? 'bg-gradient-to-b from-[#2EE9A8]/20 to-[#14171C] border-2 border-[#2EE9A8]/40' : 'card-glass'}`}>
                {highlight && <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2EE9A8] text-[#0B0D10] text-xs font-medium">Most Popular</div>}
                <h3 className="text-[#F4F6F8] font-semibold text-lg mb-1">{name}</h3>
                <div className="mb-4"><span className="text-3xl font-bold text-[#F4F6F8]">{price}</span><span className="text-[#A6AFBA] text-sm ml-1">{period}</span></div>
                <ul className="space-y-2 mb-6 flex-1">
                  {features.map(f => (
                    <li key={f} className="flex items-center gap-2 text-sm text-[#F4F6F8]/80">
                      <Check size={14} className="text-[#2EE9A8] flex-shrink-0" />{f}
                    </li>
                  ))}
                </ul>
                <Link to="/waitlist" className={`w-full py-2.5 rounded-full text-sm font-medium text-center transition-all ${highlight ? 'btn-primary' : 'btn-secondary'}`}>{cta}</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ── */}
      <section className="py-24">
        <div className="max-w-3xl mx-auto px-5 lg:px-10 text-center">
          <span className="micro-label mb-4 block">Get Started</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Ready to start <span className="text-gradient">saving smarter?</span></h2>
          <p className="body-text max-w-xl mx-auto mb-8">Join thousands of Kenyans already building their financial future. No credit card required.</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link to="/waitlist" className="btn-primary flex items-center justify-center gap-2">
              Join the waitlist <ArrowRight size={18} />
            </Link>
            <Link to="/how-it-works" className="btn-secondary flex items-center justify-center gap-2">
              Learn how it works
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
