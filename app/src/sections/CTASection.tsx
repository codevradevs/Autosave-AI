import { useRef, useLayoutEffect, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, CheckCircle, Phone, Mail } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function CTASection() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: contentRef.current, start: 'top 80%', toggleActions: 'play none none reverse' } });
    }, section);
    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsSubmitted(true);
      setTimeout(() => { setEmail(''); setIsSubmitted(false); }, 3000);
    }
  };

  return (
    <section ref={sectionRef} id="support" className="relative bg-[#0B0D10] py-20 lg:py-32 z-[180]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#14171C] via-[#0B0D10] to-[#0B0D10]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#2EE9A8]/10 rounded-full blur-[150px] pointer-events-none" />
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={contentRef} className="text-center">
          <span className="micro-label mb-4 block">Get Started</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Ready to start <span className="text-gradient">saving smarter?</span></h2>
          <p className="body-text max-w-xl mx-auto mb-8 lg:mb-10">Join thousands of Kenyans who are already building their financial future with AutoSave AI. No credit card required.</p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mb-8">
            <div className="flex-1 relative">
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 focus:ring-1 focus:ring-[#2EE9A8]/30 transition-all" required />
            </div>
            <button type="submit" disabled={isSubmitted} className="btn-primary flex items-center justify-center gap-2 whitespace-nowrap disabled:opacity-70">
              {isSubmitted ? (<><CheckCircle size={18} /> Joined!</>) : (<>Join waitlist <ArrowRight size={18} /></>)}
            </button>
          </form>
          <div className="flex flex-wrap justify-center items-center gap-4 mb-10">
            {['Free to start', 'No hidden fees', 'Cancel anytime'].map((item) => (
              <div key={item} className="flex items-center gap-2 text-[#A6AFBA] text-sm"><CheckCircle size={14} className="text-[#2EE9A8]" />{item}</div>
            ))}
          </div>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-6">
            <a href="tel:+254712345678" className="flex items-center gap-2 text-[#A6AFBA] hover:text-[#2EE9A8] transition-colors text-sm">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Phone size={14} /></div>+254 712 345 678
            </a>
            <a href="mailto:hello@autosave.ai" className="flex items-center gap-2 text-[#A6AFBA] hover:text-[#2EE9A8] transition-colors text-sm">
              <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center"><Mail size={14} /></div>hello@autosave.ai
            </a>
          </div>
          <div className="mt-12 lg:mt-16 relative">
            <div className="relative max-w-sm mx-auto">
              <img src="/images/app-mockup.jpg" alt="AutoSave App" className="w-full rounded-[24px] border border-white/10 shadow-2xl" />
              <div className="absolute inset-0 rounded-[24px] bg-gradient-to-t from-[#0B0D10]/80 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
