import { useState } from 'react';
import { Phone, Mail, MessageCircle, ChevronDown, CheckCircle } from 'lucide-react';

const faqs = [
  { q: 'How does AutoSave AI know when to save?', a: 'The AI analyzes your M-Pesa balance, income patterns, and spending behavior. It only saves when your balance is safely above your personal threshold — never when you\'re running low.' },
  { q: 'Is my M-Pesa money safe?', a: 'Yes. We use 256-bit SSL encryption, atomic database transactions, and validate every M-Pesa callback with Safaricom directly. Your money is protected at every step.' },
  { q: 'Can I withdraw my savings anytime?', a: 'Yes — unless you\'ve locked a goal. Unlocked savings can be withdrawn to M-Pesa instantly. Locked goals are protected until you reach the target (by your choice).' },
  { q: 'What is the minimum amount AutoSave saves?', a: 'The minimum auto-save amount is KES 10. The AI won\'t save less than that as it\'s not worth the transaction overhead.' },
  { q: 'How much does AutoSave AI cost?', a: 'The Basic plan is completely free — forever. Premium is KES 299/month and unlocks advanced AI insights, unlimited goals, and priority withdrawals.' },
  { q: 'Does AutoSave work without internet?', a: 'The app requires internet to function. However, your savings are stored securely in our database — they\'re not affected by connectivity issues on your end.' },
  { q: 'Can I pause AutoSave?', a: 'Yes. You can toggle AutoSave on or off anytime from your Profile page. Your savings and goals remain intact.' },
  { q: 'What happens if I delete my account?', a: 'All your savings are returned to your M-Pesa before account deletion. We never hold your money hostage.' },
];

export default function SupportPage() {
  const [open, setOpen] = useState<number | null>(null);
  const [form, setForm] = useState({ name: '', email: '', message: '' });
  const [sent, setSent] = useState(false);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ name: '', email: '', message: '' });
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="pt-28 pb-20">
      <div className="max-w-5xl mx-auto px-5 lg:px-10">

        {/* Header */}
        <div className="text-center mb-16">
          <span className="micro-label mb-4 block">Support</span>
          <h1 className="headline-lg text-[#F4F6F8] mb-5">How can we <span className="text-gradient">help you?</span></h1>
          <p className="body-text max-w-xl mx-auto">We're here for you. Check the FAQ below or reach out directly — we respond within 24 hours.</p>
        </div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-4 mb-16">
          {[
            { icon: Phone, title: 'Call us', value: '+254 712 345 678', sub: 'Mon–Fri, 8am–6pm EAT', href: 'tel:+254712345678' },
            { icon: Mail, title: 'Email us', value: 'hello@autosave.ai', sub: 'We reply within 24 hours', href: 'mailto:hello@autosave.ai' },
            { icon: MessageCircle, title: 'WhatsApp', value: '+254 712 345 678', sub: 'Quick questions welcome', href: 'https://wa.me/254712345678' },
          ].map(({ icon: Icon, title, value, sub, href }) => (
            <a key={title} href={href} className="card-glass p-6 text-center hover:border-[#2EE9A8]/30 transition-colors block">
              <div className="w-12 h-12 rounded-2xl bg-[#2EE9A8]/10 flex items-center justify-center mx-auto mb-3">
                <Icon size={22} className="text-[#2EE9A8]" />
              </div>
              <p className="text-[#F4F6F8] font-semibold mb-1">{title}</p>
              <p className="text-[#2EE9A8] text-sm mb-1">{value}</p>
              <p className="text-[#A6AFBA] text-xs">{sub}</p>
            </a>
          ))}
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="card-glass overflow-hidden">
                <button
                  onClick={() => setOpen(open === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="text-[#F4F6F8] font-medium text-sm pr-4">{q}</span>
                  <ChevronDown size={18} className={`text-[#A6AFBA] flex-shrink-0 transition-transform ${open === i ? 'rotate-180' : ''}`} />
                </button>
                {open === i && (
                  <div className="px-5 pb-5">
                    <p className="text-[#A6AFBA] text-sm leading-relaxed border-t border-white/5 pt-4">{a}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Contact form */}
        <div className="card-glass p-8">
          <h2 className="text-2xl font-bold text-[#F4F6F8] mb-2">Send us a message</h2>
          <p className="text-[#A6AFBA] text-sm mb-6">Can't find your answer above? We'll get back to you within 24 hours.</p>

          {sent ? (
            <div className="flex items-center gap-3 p-4 rounded-2xl bg-[#2EE9A8]/10 border border-[#2EE9A8]/20">
              <CheckCircle size={20} className="text-[#2EE9A8]" />
              <p className="text-[#2EE9A8] font-medium">Message sent! We'll reply within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  placeholder="Your name"
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <input
                  type="email"
                  placeholder="Email address"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
              </div>
              <textarea
                placeholder="How can we help?"
                value={form.message}
                onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                required
                rows={4}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm resize-none"
              />
              <button type="submit" className="btn-primary">Send message</button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
