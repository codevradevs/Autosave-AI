import { Twitter, Linkedin, Instagram, Youtube, MapPin, Phone, Mail } from 'lucide-react';

const footerLinks = {
  product: [
    { label: 'Features', href: '#features' },
    { label: 'How it works', href: '#how-it-works' },
    { label: 'Pricing', href: '#pricing' },
    { label: 'Security', href: '#security' },
  ],
  company: [
    { label: 'About us', href: '#' },
    { label: 'Careers', href: '#' },
    { label: 'Press', href: '#' },
    { label: 'Blog', href: '#' },
  ],
  support: [
    { label: 'Help Center', href: '#' },
    { label: 'Contact us', href: '#support' },
    { label: 'Privacy Policy', href: '#' },
    { label: 'Terms of Service', href: '#' },
  ],
};

const socialLinks = [
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Linkedin, href: '#', label: 'LinkedIn' },
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  return (
    <footer className="relative bg-[#0B0D10] pt-16 lg:pt-24 pb-8 z-[200]">
      <div className="absolute inset-0 bg-gradient-to-t from-[#14171C] to-[#0B0D10]" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#2EE9A8]/30 to-transparent" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 mb-12 lg:mb-16">
          <div className="lg:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center">
                <span className="text-[#0B0D10] font-bold text-sm">A</span>
              </div>
              <span className="text-xl font-semibold text-[#F4F6F8]">AutoSave</span>
            </div>
            <p className="text-[#A6AFBA] text-sm leading-relaxed mb-6 max-w-xs">Effortless M-Pesa savings powered by AI. Building financial freedom for every Kenyan.</p>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-[#A6AFBA] text-sm"><MapPin size={16} className="text-[#2EE9A8]" /><span>Nairobi, Kenya</span></div>
              <div className="flex items-center gap-3 text-[#A6AFBA] text-sm"><Phone size={16} className="text-[#2EE9A8]" /><span>+254 712 345 678</span></div>
              <div className="flex items-center gap-3 text-[#A6AFBA] text-sm"><Mail size={16} className="text-[#2EE9A8]" /><span>hello@autosave.ai</span></div>
            </div>
          </div>
          <div className="lg:col-span-6 grid grid-cols-3 gap-6">
            <div>
              <h4 className="text-[#F4F6F8] font-medium mb-4 text-sm">Product</h4>
              <ul className="space-y-3">
                {footerLinks.product.map((link) => (<li key={link.label}><a href={link.href} className="text-[#A6AFBA] hover:text-[#2EE9A8] transition-colors text-sm">{link.label}</a></li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F6F8] font-medium mb-4 text-sm">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (<li key={link.label}><a href={link.href} className="text-[#A6AFBA] hover:text-[#2EE9A8] transition-colors text-sm">{link.label}</a></li>))}
              </ul>
            </div>
            <div>
              <h4 className="text-[#F4F6F8] font-medium mb-4 text-sm">Support</h4>
              <ul className="space-y-3">
                {footerLinks.support.map((link) => (<li key={link.label}><a href={link.href} className="text-[#A6AFBA] hover:text-[#2EE9A8] transition-colors text-sm">{link.label}</a></li>))}
              </ul>
            </div>
          </div>
          <div className="lg:col-span-2">
            <h4 className="text-[#F4F6F8] font-medium mb-4 text-sm">Follow us</h4>
            <div className="flex gap-3">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (<a key={social.label} href={social.href} aria-label={social.label} className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#A6AFBA] hover:text-[#2EE9A8] hover:border-[#2EE9A8]/30 transition-all"><Icon size={18} /></a>);
              })}
            </div>
            <div className="mt-6 p-3 rounded-xl bg-white/5 border border-white/10">
              <p className="text-[10px] text-[#A6AFBA] uppercase tracking-wider mb-2">Powered by</p>
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded bg-[#2EE9A8] flex items-center justify-center"><span className="text-[#0B0D10] text-xs font-bold">M</span></div>
                <span className="text-[#F4F6F8] text-sm font-medium">M-Pesa</span>
              </div>
            </div>
          </div>
        </div>
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-[#A6AFBA] text-xs">© 2026 AutoSave AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-[#A6AFBA] hover:text-[#2EE9A8] text-xs transition-colors">Privacy Policy</a>
              <a href="#" className="text-[#A6AFBA] hover:text-[#2EE9A8] text-xs transition-colors">Terms of Service</a>
              <a href="#" className="text-[#A6AFBA] hover:text-[#2EE9A8] text-xs transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="text-[#A6AFBA]/50 text-xs">Made with ❤️ in Kenya for Africa</p>
        </div>
      </div>
    </footer>
  );
}
