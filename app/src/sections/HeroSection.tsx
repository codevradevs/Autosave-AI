import { useEffect, useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, Shield, Zap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const leftCardRef = useRef<HTMLDivElement>(null);
  const rightCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const subheadRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } });
      gsap.set([leftCardRef.current, rightCardRef.current], { opacity: 0, scale: 0.96 });
      gsap.set(leftCardRef.current, { x: '-60vw' });
      gsap.set(rightCardRef.current, { x: '60vw' });
      gsap.set([headlineRef.current, subheadRef.current, ctaRef.current, microLabelRef.current], { opacity: 0, y: 24 });

      tl.to(leftCardRef.current, { x: 0, opacity: 1, scale: 1, duration: 1 }, 0)
        .to(rightCardRef.current, { x: 0, opacity: 1, scale: 1, duration: 1 }, 0.08)
        .to(microLabelRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.4)
        .to(headlineRef.current, { opacity: 1, y: 0, duration: 0.7 }, 0.5)
        .to(subheadRef.current, { opacity: 1, y: 0, duration: 0.6 }, 0.65)
        .to(ctaRef.current, { opacity: 1, y: 0, duration: 0.5 }, 0.8);
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({
        scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6,
          onLeaveBack: () => {
            gsap.to([leftCardRef.current, rightCardRef.current], { x: 0, opacity: 1, scale: 1, rotate: 0, duration: 0.3 });
          },
        },
      });
      scrollTl.fromTo(leftCardRef.current, { x: 0, opacity: 1, rotate: 0 }, { x: '-40vw', opacity: 0, rotate: -1, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(rightCardRef.current, { x: 0, opacity: 1, rotate: 0 }, { x: '40vw', opacity: 0, rotate: 1, ease: 'power2.in' }, 0.7);
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="section-pinned bg-[#0B0D10] flex items-center justify-center z-10">
      <div className="absolute inset-0 bg-gradient-radial from-[#14171C] via-[#0B0D10] to-[#0B0D10] opacity-80" />
      <div className="relative w-full h-full flex items-center justify-center px-4 lg:px-0">
        <div ref={leftCardRef} className="absolute left-[4vw] lg:left-[6vw] top-[12vh] lg:top-[14vh] w-[92vw] lg:w-[42vw] h-[35vh] lg:h-[72vh] will-change-transform">
          <div className="relative w-full h-full rounded-[22px] lg:rounded-[28px] overflow-hidden border border-white/10">
            <div className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden">
              <img src="/images/mpesa-user.jpg" alt="Person using M-Pesa" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0D10]/60" />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden">
              <img src="/images/kenyan-businessman.jpg" alt="Happy Kenyan user" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 to-transparent" />
            </div>
            <div className="absolute bottom-[8%] left-[5%] w-[58%] p-4 rounded-[16px] bg-gradient-to-br from-[#2EE9A8] to-[#1DB584]">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 rounded-full bg-[#0B0D10]/20 flex items-center justify-center">
                  <Zap size={14} className="text-[#0B0D10]" />
                </div>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#0B0D10]/70">Savings</span>
              </div>
              <p className="text-[#0B0D10] text-xl lg:text-2xl font-bold">KES 12,450</p>
              <p className="text-[#0B0D10]/60 text-xs mt-1">+KES 250 today</p>
            </div>
          </div>
        </div>

        <div ref={rightCardRef} className="absolute left-[4vw] lg:left-[52vw] top-[50vh] lg:top-[14vh] w-[92vw] lg:w-[42vw] h-[45vh] lg:h-[72vh] will-change-transform">
          <div className="card-glass w-full h-full p-6 lg:p-10 flex flex-col justify-between">
            <span ref={microLabelRef} className="micro-label">AutoSave AI</span>
            <div className="flex-1 flex flex-col justify-center">
              <h1 ref={headlineRef} className="headline-xl text-[#F4F6F8] mb-4 lg:mb-6">
                Save without<br /><span className="text-gradient">thinking.</span>
              </h1>
              <p ref={subheadRef} className="body-text max-w-[90%] lg:max-w-[78%]">
                AutoSave AI turns everyday M-Pesa spending into effortless savings—smart, automatic, and always in your control.
              </p>
            </div>
            <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3">
              <button className="btn-primary flex items-center justify-center gap-2">
                Join the waitlist <ArrowRight size={18} />
              </button>
              <button className="btn-secondary flex items-center justify-center gap-2">
                <Shield size={18} /> Learn more
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
