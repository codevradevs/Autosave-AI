import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Check, Sparkles, Zap, Crown } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const plans = [
  { name: 'Basic', icon: Zap, price: 'Free', period: 'forever', description: 'Perfect for getting started with automatic savings.', features: ['Round-up savings', 'Basic auto-save rules', '1 savings goal', 'Standard withdrawals', 'Email support'], cta: 'Get started', popular: false, color: '#A6AFBA' },
  { name: 'Premium', icon: Sparkles, price: 'KES 299', period: '/month', description: 'Unlock the full power of AI-driven savings.', features: ['Everything in Basic', 'Advanced AI insights', 'Unlimited savings goals', 'Priority withdrawals', 'Smart spending analysis', 'Goal-based saving rules', '24/7 chat support'], cta: 'Start free trial', popular: true, color: '#2EE9A8' },
  { name: 'Business', icon: Crown, price: 'Custom', period: 'pricing', description: 'For teams and organizations managing group savings.', features: ['Everything in Premium', 'Group savings pools', 'Team dashboards', 'API access', 'Dedicated account manager', 'Custom integrations', 'SLA guarantee'], cta: 'Contact sales', popular: false, color: '#F59E0B' },
];

export default function PricingSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'yearly'>('monthly');

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: index * 0.15, scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="pricing" className="relative bg-[#0B0D10] py-20 lg:py-32 z-[160]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#14171C] to-[#0B0D10]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="micro-label mb-4 block">Pricing</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Simple, <span className="text-gradient">transparent</span> pricing</h2>
          <p className="body-text max-w-2xl mx-auto mb-8">Start free and upgrade when you are ready. No hidden fees, no surprises.</p>
          <div className="inline-flex items-center gap-3 p-1 rounded-full bg-white/5 border border-white/10">
            <button onClick={() => setBillingCycle('monthly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${billingCycle === 'monthly' ? 'bg-[#2EE9A8] text-[#0B0D10]' : 'text-[#A6AFBA] hover:text-[#F4F6F8]'}`}>Monthly</button>
            <button onClick={() => setBillingCycle('yearly')} className={`px-4 py-2 rounded-full text-sm font-medium transition-all flex items-center gap-2 ${billingCycle === 'yearly' ? 'bg-[#2EE9A8] text-[#0B0D10]' : 'text-[#A6AFBA] hover:text-[#F4F6F8]'}`}>Yearly<span className="text-[10px] bg-[#2EE9A8]/20 text-[#2EE9A8] px-2 py-0.5 rounded-full">Save 20%</span></button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            const displayPrice = billingCycle === 'yearly' && plan.price !== 'Free' && plan.price !== 'Custom' ? plan.price.replace(/[\d,]+/, (match) => { const num = parseInt(match.replace(/,/g, '')); return Math.round(num * 0.8).toLocaleString(); }) : plan.price;
            return (
              <div key={plan.name} ref={(el) => { cardsRef.current[index] = el; }} className={`relative rounded-[24px] p-6 lg:p-8 flex flex-col ${plan.popular ? 'bg-gradient-to-b from-[#2EE9A8]/20 to-[#14171C] border-2 border-[#2EE9A8]/50' : 'card-glass'}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 -translate-x-1/2"><span className="px-3 py-1 rounded-full bg-[#2EE9A8] text-[#0B0D10] text-xs font-medium whitespace-nowrap">Most Popular</span></div>}
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ backgroundColor: `${plan.color}20` }}>
                    <Icon size={20} style={{ color: plan.color }} />
                  </div>
                  <h3 className="text-xl font-semibold text-[#F4F6F8]">{plan.name}</h3>
                </div>
                <div className="mb-4">
                  <span className="text-3xl lg:text-4xl font-bold text-[#F4F6F8]">{displayPrice}</span>
                  <span className="text-[#A6AFBA] text-sm ml-1">{plan.period}</span>
                </div>
                <p className="text-[#A6AFBA] text-sm mb-6">{plan.description}</p>
                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5" style={{ backgroundColor: `${plan.color}20` }}>
                        <Check size={12} style={{ color: plan.color }} />
                      </div>
                      <span className="text-[#F4F6F8]/80 text-sm">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button className={`w-full py-3 rounded-full font-medium transition-all ${plan.popular ? 'btn-primary' : 'btn-secondary'}`}>{plan.cta}</button>
              </div>
            );
          })}
        </div>
        <div className="mt-12 text-center">
          <p className="text-[#A6AFBA] text-sm">All plans include bank-grade security and instant M-Pesa integration.<button className="text-[#2EE9A8] hover:underline ml-1">Learn more</button></p>
        </div>
      </div>
    </section>
  );
}
