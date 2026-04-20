import { Link } from 'react-router-dom';
import { Shield, Lock, Eye, Fingerprint, Server, Clock, CheckCircle, ArrowRight } from 'lucide-react';

const features = [
  { icon: Lock, title: '256-bit SSL Encryption', desc: 'Every byte of your data and every transaction is protected with the same encryption used by global banks.' },
  { icon: Fingerprint, title: 'Biometric Security', desc: 'Secure app access with fingerprint or face recognition. Your PIN never leaves your device unencrypted.' },
  { icon: Eye, title: 'Privacy First', desc: 'Your financial data is never sold, shared, or used for advertising. You own your data — period.' },
  { icon: Server, title: 'Secure Infrastructure', desc: 'Hosted on ISO 27001 certified servers with 99.9% uptime SLA and automatic failover.' },
  { icon: Clock, title: 'Instant Withdrawals', desc: 'Access your money anytime. Withdrawals hit your M-Pesa within seconds — no lock-in periods.' },
  { icon: Shield, title: 'AI Fraud Detection', desc: 'Real-time monitoring detects and blocks suspicious activity before it affects your account.' },
];

export default function SecurityPage() {
  return (
    <div className="pt-28 pb-20">
      <div className="max-w-7xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="micro-label mb-4 block">Security</span>
          <h1 className="headline-lg text-[#F4F6F8] mb-5">Your money is <span className="text-gradient">always safe</span></h1>
          <p className="body-text max-w-2xl mx-auto">We take security as seriously as the banks. Your savings are protected by the same technology trusted by financial institutions worldwide.</p>
        </div>

        {/* Hero image + trust badge */}
        <div className="relative rounded-[32px] overflow-hidden mb-20 h-72">
          <img src="/images/nairobi-skyline.jpg" alt="Nairobi skyline" className="w-full h-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/85 via-[#0B0D10]/50 to-transparent flex items-center">
            <div className="px-10">
              <div className="flex items-center gap-4 mb-4">
                <div className="w-16 h-16 rounded-full bg-[#2EE9A8]/20 border border-[#2EE9A8]/40 flex items-center justify-center">
                  <Shield size={32} className="text-[#2EE9A8]" />
                </div>
                <div>
                  <p className="text-[#2EE9A8] font-bold text-lg">CBK Compliant</p>
                  <p className="text-[#A6AFBA] text-sm">Central Bank of Kenya guidelines</p>
                </div>
              </div>
              <p className="text-[#F4F6F8] text-xl font-semibold max-w-sm">Built to meet Kenya's financial regulations from day one.</p>
            </div>
          </div>
        </div>

        {/* Security features grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-20">
          {features.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="card-glass p-6 flex gap-4 hover:border-[#2EE9A8]/20 transition-colors">
              <div className="w-12 h-12 rounded-xl bg-[#2EE9A8]/10 flex items-center justify-center flex-shrink-0">
                <Icon size={22} className="text-[#2EE9A8]" />
              </div>
              <div>
                <h3 className="text-[#F4F6F8] font-semibold mb-1.5">{title}</h3>
                <p className="text-[#A6AFBA] text-sm leading-relaxed">{desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* How we protect your money */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20">
          <div className="rounded-[28px] overflow-hidden border border-white/10 aspect-[4/3]">
            <img src="/images/mobile-payment.jpg" alt="Secure mobile payment" className="w-full h-full object-cover" />
          </div>
          <div>
            <span className="micro-label mb-4 block">How we protect you</span>
            <h2 className="text-3xl font-bold text-[#F4F6F8] mb-5">Multiple layers of protection</h2>
            <div className="space-y-4">
              {[
                { step: '1', title: 'You initiate', desc: 'All transactions are user-initiated. We never move money without your explicit action or pre-set AutoSave rules.' },
                { step: '2', title: 'We verify', desc: 'Every M-Pesa callback is validated against Safaricom\'s servers. Fake callbacks are rejected instantly.' },
                { step: '3', title: 'Atomic updates', desc: 'Wallet balances use atomic database operations — no race conditions, no double-spending, ever.' },
                { step: '4', title: 'Audit trail', desc: 'Every single transaction is logged with timestamps, IP addresses, and status. Full transparency.' },
              ].map(({ step, title, desc }) => (
                <div key={step} className="flex gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#2EE9A8]/10 border border-[#2EE9A8]/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                    <span className="text-[#2EE9A8] text-xs font-bold">{step}</span>
                  </div>
                  <div>
                    <p className="text-[#F4F6F8] font-medium text-sm">{title}</p>
                    <p className="text-[#A6AFBA] text-xs mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Compliance badges */}
        <div className="card-glass p-8 text-center mb-16">
          <p className="micro-label mb-6 block">Certifications & Compliance</p>
          <div className="flex flex-wrap justify-center gap-4">
            {['PCI DSS', 'ISO 27001', 'GDPR', 'SOC 2', 'CBK Compliant'].map(cert => (
              <div key={cert} className="flex items-center gap-2 px-4 py-2.5 rounded-full bg-white/5 border border-white/10">
                <CheckCircle size={14} className="text-[#2EE9A8]" />
                <span className="text-[#F4F6F8] text-sm font-medium">{cert}</span>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-4">Save with confidence</h2>
          <p className="text-[#A6AFBA] mb-6">Your money is protected. Your data is private. Your savings are yours.</p>
          <Link to="/waitlist" className="btn-primary inline-flex items-center gap-2">
            Get started free <ArrowRight size={18} />
          </Link>
        </div>
      </div>
    </div>
  );
}
