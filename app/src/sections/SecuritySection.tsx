import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Lock, Eye, Fingerprint, Server, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const securityFeatures = [
  { icon: Lock, title: 'Bank-Grade Encryption', description: '256-bit SSL encryption protects all your data and transactions.' },
  { icon: Fingerprint, title: 'Biometric Security', description: 'Secure access with fingerprint or face recognition.' },
  { icon: Eye, title: 'Privacy First', description: 'Your data is never sold or shared with third parties.' },
  { icon: Server, title: 'Secure Infrastructure', description: 'Hosted on ISO 27001 certified servers with 99.9% uptime.' },
  { icon: Clock, title: 'Instant Withdrawals', description: 'Access your money anytime with instant M-Pesa withdrawals.' },
  { icon: Shield, title: 'Fraud Protection', description: 'AI-powered monitoring detects and prevents suspicious activity.' },
];

export default function SecuritySection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<(HTMLDivElement | null)[]>([]);
  const badgeRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      gsap.fromTo(badgeRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.6, scrollTrigger: { trigger: badgeRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      featuresRef.current.forEach((feature, index) => {
        if (!feature) return;
        gsap.fromTo(feature, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.6, delay: index * 0.1, scrollTrigger: { trigger: feature, start: 'top 90%', toggleActions: 'play none none reverse' } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="security" className="relative bg-[#0B0D10] py-20 lg:py-32 z-[170]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#14171C] via-[#0B0D10] to-[#14171C]" />
      <div className="absolute inset-0 opacity-[0.02]">
        <div className="w-full h-full" style={{ backgroundImage: `radial-gradient(circle at 2px 2px, rgba(46, 233, 168, 0.3) 1px, transparent 0)`, backgroundSize: '40px 40px' }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="micro-label mb-4 block">Security</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Your money is <span className="text-gradient">always safe</span></h2>
          <p className="body-text max-w-2xl mx-auto">We take security seriously. Your savings are protected by the same technology used by banks worldwide.</p>
        </div>
        <div ref={badgeRef} className="flex justify-center mb-12 lg:mb-16">
          <div className="relative">
            <div className="w-24 h-24 lg:w-32 lg:h-32 rounded-full bg-gradient-to-br from-[#2EE9A8]/30 to-[#2EE9A8]/10 flex items-center justify-center border border-[#2EE9A8]/30">
              <Shield size={40} className="text-[#2EE9A8] lg:w-12 lg:h-12" />
            </div>
            <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 rounded-full bg-[#2EE9A8] text-[#0B0D10] text-xs font-medium whitespace-nowrap">CBK Compliant</div>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {securityFeatures.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div key={feature.title} ref={(el) => { featuresRef.current[index] = el; }} className="card-glass p-6 flex items-start gap-4 hover:border-[#2EE9A8]/30 transition-colors">
                <div className="w-12 h-12 rounded-xl bg-[#2EE9A8]/10 flex items-center justify-center flex-shrink-0">
                  <Icon size={22} className="text-[#2EE9A8]" />
                </div>
                <div>
                  <h3 className="text-[#F4F6F8] font-medium mb-2">{feature.title}</h3>
                  <p className="text-[#A6AFBA] text-sm leading-relaxed">{feature.description}</p>
                </div>
              </div>
            );
          })}
        </div>
        <div className="mt-12 lg:mt-16 flex flex-wrap justify-center items-center gap-6 lg:gap-10">
          {['PCI DSS', 'ISO 27001', 'GDPR', 'SOC 2'].map((cert) => (
            <div key={cert} className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-[#A6AFBA] text-xs font-mono">{cert} Certified</div>
          ))}
        </div>
      </div>
    </section>
  );
}
