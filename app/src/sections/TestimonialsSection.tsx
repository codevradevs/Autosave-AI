import { useRef, useLayoutEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Quote, Star } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const testimonials = [
  { name: 'Wanjiku M.', role: 'Small Business Owner', image: '/images/testimonial-mama.jpg', quote: 'AutoSave has changed how I save. I run a small kiosk in Nairobi, and without even thinking, I have saved over KES 50,000 in just 3 months.', rating: 5, location: 'Nairobi, Kenya' },
  { name: 'James Ochieng', role: 'Software Developer', image: '/images/testimonial-man.jpg', quote: 'The AI is incredibly smart. It knows when I have extra cash and saves accordingly, but never touches my money when things are tight.', rating: 5, location: 'Nairobi, Kenya' },
  { name: 'Amina Hassan', role: 'Marketing Manager', image: '/images/testimonial-woman.jpg', quote: 'I have tried many savings apps, but AutoSave is different. It connects directly to M-Pesa and just works. My emergency fund grew without me noticing!', rating: 5, location: 'Mombasa, Kenya' },
];

const stats = [
  { value: '50K+', label: 'Active Savers' },
  { value: 'KES 500M+', label: 'Total Saved' },
  { value: '4.9/5', label: 'App Rating' },
  { value: '99.9%', label: 'Uptime' },
];

export default function TestimonialsSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  useLayoutEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(titleRef.current, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 0.8, scrollTrigger: { trigger: titleRef.current, start: 'top 85%', toggleActions: 'play none none reverse' } });
      cardsRef.current.forEach((card, index) => {
        if (!card) return;
        gsap.fromTo(card, { y: 60, opacity: 0 }, { y: 0, opacity: 1, duration: 0.7, delay: index * 0.15, scrollTrigger: { trigger: card, start: 'top 85%', toggleActions: 'play none none reverse' } });
      });
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative bg-[#0B0D10] py-20 lg:py-32 z-[150]">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0B0D10] via-[#14171C] to-[#0B0D10]" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div ref={titleRef} className="text-center mb-12 lg:mb-16">
          <span className="micro-label mb-4 block">Testimonials</span>
          <h2 className="headline-lg text-[#F4F6F8] mb-4">Loved by <span className="text-gradient">Kenyans</span></h2>
          <p className="body-text max-w-2xl mx-auto">Join thousands of Kenyans who are already saving smarter with AutoSave AI.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={testimonial.name} ref={(el) => { cardsRef.current[index] = el; }} className="card-glass p-6 lg:p-8 flex flex-col">
              <div className="w-10 h-10 rounded-full bg-[#2EE9A8]/10 flex items-center justify-center mb-6">
                <Quote size={18} className="text-[#2EE9A8]" />
              </div>
              <p className="text-[#F4F6F8]/90 text-sm lg:text-base leading-relaxed mb-6 flex-1">"{testimonial.quote}"</p>
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonial.rating }).map((_, i) => (<Star key={i} size={14} className="text-[#2EE9A8] fill-[#2EE9A8]" />))}
              </div>
              <div className="flex items-center gap-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover border-2 border-[#2EE9A8]/30" />
                <div>
                  <p className="text-[#F4F6F8] font-medium text-sm">{testimonial.name}</p>
                  <p className="text-[#A6AFBA] text-xs">{testimonial.role}</p>
                  <p className="text-[#2EE9A8]/70 text-[10px] mt-0.5">{testimonial.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-16 lg:mt-20 grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl lg:text-4xl font-bold text-gradient mb-2">{stat.value}</p>
              <p className="text-[#A6AFBA] text-sm">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
