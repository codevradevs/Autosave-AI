import { Link } from 'react-router-dom';
import { ArrowRight, Heart, Zap, Users, TrendingUp } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="micro-label mb-4 block">About Us</span>
          <h1 className="headline-lg text-[#F4F6F8] mb-5">Built for <span className="text-gradient">every Kenyan</span></h1>
          <p className="body-text max-w-2xl mx-auto">We believe financial freedom shouldn't require discipline, spreadsheets, or a finance degree. It should just happen — automatically.</p>
        </div>

        {/* Hero image */}
        <div className="rounded-[32px] overflow-hidden mb-20 h-80 relative">
          <img src="/images/nairobi-skyline.jpg" alt="Nairobi skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/70 via-transparent to-transparent flex items-end">
            <div className="p-10">
              <p className="text-[#F4F6F8] text-2xl font-bold">Nairobi, Kenya 🇰🇪</p>
              <p className="text-[#A6AFBA]">Where AutoSave AI was born</p>
            </div>
          </div>
        </div>

        {/* Mission */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-24">
          <div>
            <span className="micro-label mb-4 block">Our Mission</span>
            <h2 className="text-3xl font-bold text-[#F4F6F8] mb-5">Turning everyday spending into lasting wealth</h2>
            <p className="text-[#A6AFBA] leading-relaxed mb-4">
              Most Kenyans want to save. The problem isn't intention — it's execution. Life gets busy, emergencies happen, and that "I'll save next month" mindset kicks in.
            </p>
            <p className="text-[#A6AFBA] leading-relaxed mb-4">
              AutoSave AI removes the human element from saving. It watches your M-Pesa activity, understands your financial rhythm, and saves small amounts at exactly the right moments — when you won't feel it.
            </p>
            <p className="text-[#A6AFBA] leading-relaxed">
              The result? You open the app one day and realize you've saved KES 50,000 without ever consciously trying.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="rounded-[20px] overflow-hidden aspect-square">
              <img src="/images/kenyan-businessman.jpg" alt="Kenyan businessman" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[20px] overflow-hidden aspect-square mt-8">
              <img src="/images/kenyan-businesswoman.jpg" alt="Kenyan businesswoman" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[20px] overflow-hidden aspect-square">
              <img src="/images/testimonial-mama.jpg" alt="Kenyan mother" className="w-full h-full object-cover" />
            </div>
            <div className="rounded-[20px] overflow-hidden aspect-square mt-8">
              <img src="/images/testimonial-woman.jpg" alt="Kenyan woman" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* Values */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <span className="micro-label mb-4 block">Our Values</span>
            <h2 className="text-3xl font-bold text-[#F4F6F8]">What drives us</h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
            {[
              { icon: Heart, color: 'text-red-400', bg: 'bg-red-400/10', title: 'People First', desc: 'Every feature is designed around real Kenyan financial behavior — not Silicon Valley assumptions.' },
              { icon: Zap, color: 'text-[#2EE9A8]', bg: 'bg-[#2EE9A8]/10', title: 'Effortless', desc: 'If it requires effort from the user, we haven\'t done our job. Saving should be invisible.' },
              { icon: Users, color: 'text-blue-400', bg: 'bg-blue-400/10', title: 'Inclusive', desc: 'From mama mbogas to software engineers — AutoSave works for every income level.' },
              { icon: TrendingUp, color: 'text-yellow-400', bg: 'bg-yellow-400/10', title: 'Transparent', desc: 'No hidden fees. No confusing terms. You always know exactly where your money is.' },
            ].map(({ icon: Icon, color, bg, title, desc }) => (
              <div key={title} className="card-glass p-6 text-center">
                <div className={`w-12 h-12 rounded-2xl ${bg} flex items-center justify-center mx-auto mb-4`}>
                  <Icon size={22} className={color} />
                </div>
                <h3 className="text-[#F4F6F8] font-semibold mb-2">{title}</h3>
                <p className="text-[#A6AFBA] text-sm leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="card-glass p-10 mb-20">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50K+', label: 'Active Savers' },
              { value: 'KES 500M+', label: 'Total Saved' },
              { value: '4.9/5', label: 'App Rating' },
              { value: '99.9%', label: 'Uptime' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-bold text-gradient mb-1">{value}</p>
                <p className="text-[#A6AFBA] text-sm">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Family image + quote */}
        <div className="relative rounded-[32px] overflow-hidden mb-20 h-64">
          <img src="/images/family-saving.jpg" alt="Family saving" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-[#0B0D10]/60 flex items-center justify-center">
            <p className="text-[#F4F6F8] text-2xl font-bold text-center max-w-lg px-6">
              "You won't feel it leaving… but you'll feel it when it accumulates."
            </p>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-4">Join the movement</h2>
          <p className="text-[#A6AFBA] mb-6">Thousands of Kenyans are already saving smarter. Be next.</p>
          <Link to="/waitlist" className="btn-primary inline-flex items-center gap-2">
            Join the waitlist <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
