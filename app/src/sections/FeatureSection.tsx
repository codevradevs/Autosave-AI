import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

interface FeatureSectionProps {
  id?: string;
  headline: string;
  subheadline: string;
  ctaText: string;
  imageTop: string;
  imageBottom: string;
  layout: 'left-text' | 'right-text';
  mintCardContent?: { label: string; value: string; subtext: string };
  zIndex: number;
}

export default function FeatureSection({ id, headline, subheadline, ctaText, imageTop, imageBottom, layout, mintCardContent, zIndex }: FeatureSectionProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const textCardRef = useRef<HTMLDivElement>(null);
  const collageCardRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const photoTopRef = useRef<HTMLDivElement>(null);
  const photoBottomRef = useRef<HTMLDivElement>(null);
  const mintCardRef = useRef<HTMLDivElement>(null);
  const isLeftText = layout === 'left-text';

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      const scrollTl = gsap.timeline({ scrollTrigger: { trigger: section, start: 'top top', end: '+=130%', pin: true, scrub: 0.6 } });
      scrollTl.fromTo(textCardRef.current, { x: isLeftText ? '-60vw' : '60vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(collageCardRef.current, { x: isLeftText ? '60vw' : '-60vw', opacity: 0, scale: 0.98 }, { x: 0, opacity: 1, scale: 1, ease: 'none' }, 0);
      scrollTl.fromTo(photoTopRef.current, { y: '-12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.05);
      scrollTl.fromTo(photoBottomRef.current, { y: '12vh', opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      if (mintCardRef.current) scrollTl.fromTo(mintCardRef.current, { y: '10vh', scale: 0.92, opacity: 0 }, { y: 0, scale: 1, opacity: 1, ease: 'none' }, 0.15);
      scrollTl.fromTo(headlineRef.current, { y: 22, opacity: 0 }, { y: 0, opacity: 1, ease: 'none' }, 0.1);
      scrollTl.fromTo(textCardRef.current, { x: 0, opacity: 1 }, { x: isLeftText ? '-35vw' : '35vw', opacity: 0, ease: 'power2.in' }, 0.7);
      scrollTl.fromTo(collageCardRef.current, { x: 0, opacity: 1 }, { x: isLeftText ? '35vw' : '-35vw', opacity: 0, ease: 'power2.in' }, 0.7);
      if (photoTopRef.current) scrollTl.fromTo(photoTopRef.current, { y: 0, opacity: 1 }, { y: '-6vh', opacity: 0.2, ease: 'power2.in' }, 0.75);
      if (photoBottomRef.current) scrollTl.fromTo(photoBottomRef.current, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0.2, ease: 'power2.in' }, 0.75);
      if (mintCardRef.current) scrollTl.fromTo(mintCardRef.current, { y: 0, opacity: 1 }, { y: '6vh', opacity: 0.2, ease: 'power2.in' }, 0.75);
    }, section);
    return () => ctx.revert();
  }, [isLeftText]);

  const textCard = (
    <div ref={textCardRef} className={`absolute ${isLeftText ? 'left-[4vw] lg:left-[6vw]' : 'left-[4vw] lg:left-[52vw]'} top-[50vh] lg:top-[14vh] w-[92vw] lg:w-[42vw] h-[45vh] lg:h-[72vh] will-change-transform`}>
      <div className="card-glass w-full h-full p-6 lg:p-10 flex flex-col justify-center">
        <h2 ref={headlineRef} className="headline-lg text-[#F4F6F8] mb-4 lg:mb-6 whitespace-pre-line">{headline}</h2>
        <p className="body-text max-w-[90%] lg:max-w-[85%] mb-6 lg:mb-8">{subheadline}</p>
        <button className="btn-secondary w-fit flex items-center gap-2 text-sm">{ctaText} <ArrowRight size={16} /></button>
      </div>
    </div>
  );

  const collageCard = (
    <div ref={collageCardRef} className={`absolute ${isLeftText ? 'left-[4vw] lg:left-[52vw]' : 'left-[4vw] lg:left-[6vw]'} top-[12vh] lg:top-[14vh] w-[92vw] lg:w-[42vw] h-[35vh] lg:h-[72vh] will-change-transform`}>
      <div className="relative w-full h-full rounded-[22px] lg:rounded-[28px] overflow-hidden border border-white/10">
        <div ref={photoTopRef} className="absolute top-0 left-0 right-0 h-[55%] overflow-hidden will-change-transform">
          <img src={imageTop} alt="Feature" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[#0B0D10]/60" />
        </div>
        <div ref={photoBottomRef} className="absolute bottom-0 left-0 right-0 h-[50%] overflow-hidden will-change-transform">
          <img src={imageBottom} alt="Feature" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/80 to-transparent" />
        </div>
        {mintCardContent && (
          <div ref={mintCardRef} className="absolute bottom-[8%] left-[5%] w-[65%] p-3 lg:p-4 rounded-[14px] lg:rounded-[16px] bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] will-change-transform">
            <span className="text-[9px] lg:text-[10px] font-mono uppercase tracking-wider text-[#0B0D10]/70">{mintCardContent.label}</span>
            <p className="text-[#0B0D10] text-lg lg:text-xl font-bold mt-1">{mintCardContent.value}</p>
            <p className="text-[#0B0D10]/60 text-[10px] lg:text-xs mt-1">{mintCardContent.subtext}</p>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <section ref={sectionRef} id={id} className="section-pinned bg-[#0B0D10] flex items-center justify-center" style={{ zIndex }}>
      <div className="absolute inset-0 bg-gradient-radial from-[#14171C]/50 via-[#0B0D10] to-[#0B0D10]" />
      <div className="relative w-full h-full flex items-center justify-center">
        {isLeftText ? (<>{textCard}{collageCard}</>) : (<>{collageCard}{textCard}</>)}
      </div>
    </section>
  );
}
