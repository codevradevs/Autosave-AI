import { Link } from 'react-router-dom';
import { Smartphone, Brain, Target, Wallet, ArrowRight, CheckCircle } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Smartphone,
    color: '#2EE9A8',
    title: 'Connect M-Pesa',
    desc: 'Link your M-Pesa account securely in seconds. We use bank-grade 256-bit encryption to protect your data. No passwords stored — ever.',
    img: '/images/mpesa-user.jpg',
    points: ['Instant M-Pesa integration', 'Zero passwords stored', 'Verified by Safaricom'],
  },
  {
    num: '02',
    icon: Brain,
    color: '#3B82F6',
    title: 'AI Learns Your Habits',
    desc: 'Our AI analyzes your income patterns, spending behavior, and balance trends to build your unique financial profile. It learns what "safe to save" means for you specifically.',
    img: '/images/kenyan-businessman.jpg',
    points: ['Income frequency detection', 'Spending pattern analysis', 'Personal safety threshold'],
  },
  {
    num: '03',
    icon: Target,
    color: '#F59E0B',
    title: 'Set Your Goals',
    desc: 'Whether it\'s rent, a new phone, or an emergency fund — set savings goals with target amounts and deadlines. Lock them to prevent impulsive withdrawals.',
    img: '/images/nairobi-skyline.jpg',
    points: ['Unlimited goals (Premium)', 'Lock until complete', 'Deadline tracking'],
  },
  {
    num: '04',
    icon: Wallet,
    color: '#EC4899',
    title: 'Save Automatically',
    desc: 'AutoSave intelligently saves small amounts when you can afford it. You won\'t feel it leaving, but you\'ll feel it growing. Withdraw anytime you need it.',
    img: '/images/family-saving.jpg',
    points: ['Saves only when safe', 'Instant withdrawals', 'Real-time notifications'],
  },
];

export default function HowItWorksPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="text-center mb-20">
          <span className="micro-label mb-4 block">How It Works</span>
          <h1 className="headline-lg text-[#F4F6F8] mb-5">Effortless savings in <span className="text-gradient">4 steps</span></h1>
          <p className="body-text max-w-2xl mx-auto">No complicated setup. No manual transfers. Just connect and let AutoSave do the work.</p>
        </div>

        {/* Steps */}
        <div className="space-y-24">
          {steps.map(({ num, icon: Icon, color, title, desc, img, points }, i) => (
            <div key={num} className={`grid lg:grid-cols-2 gap-12 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}>
              {/* Text */}
              <div className={i % 2 === 1 ? 'lg:col-start-2' : ''}>
                <div className="flex items-center gap-4 mb-5">
                  <span className="text-5xl font-bold text-white/5 font-mono">{num}</span>
                  <div className="w-12 h-12 rounded-2xl flex items-center justify-center" style={{ backgroundColor: `${color}20` }}>
                    <Icon size={24} style={{ color }} />
                  </div>
                </div>
                <h2 className="text-3xl font-bold text-[#F4F6F8] mb-4">{title}</h2>
                <p className="text-[#A6AFBA] leading-relaxed mb-6">{desc}</p>
                <ul className="space-y-2">
                  {points.map(p => (
                    <li key={p} className="flex items-center gap-3 text-sm text-[#F4F6F8]/80">
                      <CheckCircle size={16} style={{ color }} className="flex-shrink-0" />{p}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Image */}
              <div className={`relative ${i % 2 === 1 ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                <div className="rounded-[28px] overflow-hidden border border-white/10 aspect-[4/3]">
                  <img src={img} alt={title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/30 to-transparent" />
                </div>
                {/* Step badge */}
                <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-2xl flex items-center justify-center shadow-xl" style={{ backgroundColor: color }}>
                  <Icon size={28} className="text-[#0B0D10]" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* AI deep dive */}
        <div className="mt-28 card-glass p-8 lg:p-12">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <span className="micro-label mb-4 block">The AI Engine</span>
              <h2 className="text-3xl font-bold text-[#F4F6F8] mb-5">How the AI studies your finances</h2>
              <p className="text-[#A6AFBA] leading-relaxed mb-6">
                AutoSave doesn't just save blindly. It builds a dynamic financial profile for you and makes intelligent decisions every time your balance changes.
              </p>
              <div className="space-y-4">
                {[
                  { label: 'Income Stability Score', desc: 'Tracks how consistent your deposits are over 30 days' },
                  { label: 'Pain Threshold Detection', desc: 'Learns the minimum balance before you panic-withdraw' },
                  { label: 'Safe Save Calculation', desc: 'balance − (minBalance + buffer) × your saving tolerance' },
                  { label: 'Adaptive Pausing', desc: 'Automatically pauses saving when balance drops too low' },
                ].map(({ label, desc }) => (
                  <div key={label} className="flex gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-[#2EE9A8] mt-2 flex-shrink-0" />
                    <div>
                      <p className="text-[#F4F6F8] text-sm font-medium">{label}</p>
                      <p className="text-[#A6AFBA] text-xs mt-0.5">{desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-[24px] overflow-hidden border border-white/10 aspect-square">
              <img src="/images/kenyan-businesswoman.jpg" alt="AI financial analysis" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-20 text-center">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-4">Ready to let AI save for you?</h2>
          <Link to="/waitlist" className="btn-primary inline-flex items-center gap-2">
            Join the waitlist <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
