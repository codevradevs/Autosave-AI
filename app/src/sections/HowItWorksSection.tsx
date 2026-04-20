import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Smartphone, Brain, Target, Wallet } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const steps = [
  { icon: Smartphone, title: 'Connect M-Pesa', description: 'Link your M-Pesa account securely in seconds. We use bank-grade encryption to protect your data.', color: '#2EE9A8' },
  { icon: Brain, title: 'AI Learns Your Habits', description: 'Our AI analyzes your income patterns, spending behavior, and balance trends to understand your financial rhythm.', color: '#3B82F6' },
  { icon: Target, title: 'Set Your Goals', description: 'Whether it is rent, a new phone, or an emergency fund, set your savings goals with target amounts and deadlines.', color: '#F59E0B' },
  { icon: Wallet, title: 'Save Automatically', description: 'AutoSave intelligently saves small amounts when you can afford it. You will not feel it leaving, but you will feel it growing.', color: '#EC4899' },
];

export default function HowItWorksSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const stepsRef = useRef<(HTMLDivElement | null)[]>([]);
  const lineRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(lineRef.current, { scaleY: 0 }, { scaleY: 1, duration: 1.5, ease: 'power2.out', scrollTrigger: { trigger: section, start: 'top 60%', toggleActions: 'play none none reverse' } });
      stepsRef.current.forEach((step, index) => {
        if (!step) return;
        gsap.fromTo(step, { x: index % 2 === 0 ? -40 : 40, opacity: 0 }, { x: 0, opacity: 1, duration: 0.7, delay: index * 0.2, scrollTrigger: { trigger: step, start: 'top 85%', toggleActions: 'play none none reverse' } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="relative bg-[#0B0D10] py-20 lg:py-32 z-[140]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#14171C] via-[#0B0D10] to-[#14171C]" />
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-16 lg:mb-20">
          <span className="micro-label mb-4 block">How It Works</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Effortless savings in <span className="text-gradient">4 steps</span></h2>
          <p className="body-text max-w-2xl mx-auto">No complicated setup. No manual transfers. Just connect and let AutoSave do the magic.</p>
        </div>
        <div className="relative">
          <div ref={lineRef} className="hidden lg:block absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#2EE9A8] via-[#3B82F6] to-[#EC4899] origin-top" />
          <div className="space-y-12 lg:space-y-0">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isEven = index % 2 === 0;
              return (
                <div key={step.title} ref={(el) => { stepsRef.current[index] = el; }} className={`relative lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center ${index !== 0 ? 'lg:mt-16' : ''}`}>
                  <div className={`${isEven ? 'lg:pr-16 lg:text-right' : 'lg:col-start-2 lg:pl-16'}`}>
                    <div className={`flex items-center gap-4 mb-4 ${isEven ? 'lg:flex-row-reverse' : ''}`}>
                      <div className="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0" style={{ backgroundColor: `${step.color}20` }}>
                        <Icon size={24} style={{ color: step.color }} />
                      </div>
                      <span className="text-[#A6AFBA] font-mono text-sm">Step {index + 1}</span>
                    </div>
                    <h3 className="text-xl lg:text-2xl font-semibold text-[#F4F6F8] mb-3">{step.title}</h3>
                    <p className="text-[#A6AFBA] text-sm lg:text-base leading-relaxed">{step.description}</p>
                  </div>
                  <div className="hidden lg:block absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                    <div className="w-4 h-4 rounded-full border-2 border-[#0B0D10]" style={{ backgroundColor: step.color }} />
                  </div>
                  <div className={`hidden lg:block ${isEven ? 'lg:col-start-2' : 'lg:col-start-1 lg:row-start-1'}`} />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
