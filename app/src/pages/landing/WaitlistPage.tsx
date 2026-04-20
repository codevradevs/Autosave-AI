import { useState } from 'react';
import { CheckCircle, ArrowRight, Star, Users, TrendingUp, Shield } from 'lucide-react';

export default function WaitlistPage() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(r => setTimeout(r, 800)); // simulate API
    setSubmitted(true);
    setLoading(false);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-6xl mx-auto px-5 lg:px-10">

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left — form */}
          <div>
            <span className="micro-label mb-5 block">Early Access</span>
            <h1 className="headline-lg text-[#F4F6F8] mb-5">
              Be first to <span className="text-gradient">save smarter.</span>
            </h1>
            <p className="body-text mb-8">
              Join the waitlist and get early access to AutoSave AI. No credit card required. Free to start.
            </p>

            {submitted ? (
              <div className="card-glass p-8 text-center">
                <div className="w-16 h-16 rounded-full bg-[#2EE9A8]/20 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle size={32} className="text-[#2EE9A8]" />
                </div>
                <h3 className="text-[#F4F6F8] font-bold text-xl mb-2">You're on the list! 🎉</h3>
                <p className="text-[#A6AFBA] text-sm">We'll notify you the moment early access opens. In the meantime, tell a friend!</p>
                <div className="mt-6 p-4 rounded-2xl bg-[#2EE9A8]/10 border border-[#2EE9A8]/20">
                  <p className="text-[#2EE9A8] text-sm font-medium">💡 Pro tip: Share your referral link and skip the queue</p>
                </div>
              </div>
            ) : (
              <form onSubmit={submit} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email address"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <input
                  type="tel"
                  placeholder="Phone number (optional)"
                  value={phone}
                  onChange={e => setPhone(e.target.value)}
                  className="w-full px-5 py-3.5 rounded-2xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 py-3.5 disabled:opacity-60">
                  {loading
                    ? <span className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" />
                    : <><span>Join the waitlist</span><ArrowRight size={18} /></>}
                </button>
                <div className="flex flex-wrap gap-4 pt-1">
                  {['Free to start', 'No credit card', 'Cancel anytime'].map(t => (
                    <div key={t} className="flex items-center gap-1.5 text-[#A6AFBA] text-xs">
                      <CheckCircle size={12} className="text-[#2EE9A8]" />{t}
                    </div>
                  ))}
                </div>
              </form>
            )}

            {/* Social proof mini */}
            <div className="mt-8 flex items-center gap-4">
              <div className="flex -space-x-2">
                {['/images/testimonial-mama.jpg', '/images/testimonial-man.jpg', '/images/testimonial-woman.jpg'].map((src, i) => (
                  <img key={i} src={src} alt="" className="w-8 h-8 rounded-full border-2 border-[#0B0D10] object-cover" />
                ))}
              </div>
              <div>
                <div className="flex gap-0.5 mb-0.5">
                  {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={11} className="text-[#2EE9A8] fill-[#2EE9A8]" />)}
                </div>
                <p className="text-[#A6AFBA] text-xs">Joined by 50,000+ Kenyans</p>
              </div>
            </div>
          </div>

          {/* Right — benefits + images */}
          <div className="space-y-5">
            {/* App mockup */}
            <div className="rounded-[28px] overflow-hidden border border-white/10 h-56">
              <img src="/images/app-mockup.jpg" alt="AutoSave app mockup" className="w-full h-full object-cover" />
            </div>

            {/* Benefits */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { icon: Users, label: '50K+ Savers', color: 'text-[#2EE9A8]', bg: 'bg-[#2EE9A8]/10' },
                { icon: TrendingUp, label: 'KES 500M Saved', color: 'text-blue-400', bg: 'bg-blue-400/10' },
                { icon: Shield, label: 'CBK Compliant', color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
              ].map(({ icon: Icon, label, color, bg }) => (
                <div key={label} className="card-glass p-4 text-center">
                  <div className={`w-9 h-9 rounded-xl ${bg} flex items-center justify-center mx-auto mb-2`}>
                    <Icon size={18} className={color} />
                  </div>
                  <p className="text-[#F4F6F8] text-xs font-medium">{label}</p>
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="card-glass p-5">
              <div className="flex gap-1 mb-3">
                {Array.from({ length: 5 }).map((_, i) => <Star key={i} size={13} className="text-[#2EE9A8] fill-[#2EE9A8]" />)}
              </div>
              <p className="text-[#F4F6F8]/90 text-sm leading-relaxed mb-4">"I saved KES 50,000 in 3 months without even trying. AutoSave just works in the background while I live my life."</p>
              <div className="flex items-center gap-3">
                <img src="/images/testimonial-mama.jpg" alt="Wanjiku" className="w-9 h-9 rounded-full object-cover border-2 border-[#2EE9A8]/30" />
                <div>
                  <p className="text-[#F4F6F8] text-sm font-medium">Wanjiku M.</p>
                  <p className="text-[#A6AFBA] text-xs">Small Business Owner, Nairobi</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
