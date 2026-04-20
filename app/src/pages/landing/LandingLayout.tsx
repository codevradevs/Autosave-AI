import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, ArrowRight } from 'lucide-react';

export default function LandingLayout() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => { setMobileOpen(false); window.scrollTo(0, 0); }, [location.pathname]);

  const navLinks = [
    { to: '/how-it-works', label: 'How it works' },
    { to: '/security', label: 'Security' },
    { to: '/about', label: 'About' },
    { to: '/support', label: 'Support' },
  ];

  return (
    <div className="min-h-screen bg-[#0B0D10]">
      <div className="grain-overlay" />

      {/* Navbar */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-[#0B0D10]/95 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'}`}>
        <div className="max-w-7xl mx-auto px-5 lg:px-10 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center">
              <span className="text-[#0B0D10] font-bold text-sm">A</span>
            </div>
            <span className="text-lg font-semibold text-[#F4F6F8]">AutoSave</span>
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map(({ to, label }) => (
              <Link key={to} to={to} className={`text-sm transition-colors ${location.pathname === to ? 'text-[#2EE9A8]' : 'text-[#A6AFBA] hover:text-[#F4F6F8]'}`}>
                {label}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" className="btn-secondary text-sm py-2 px-5">Sign in</Link>
            <Link to="/waitlist" className="btn-primary text-sm py-2 px-5 flex items-center gap-2">
              Join waitlist <ArrowRight size={14} />
            </Link>
          </div>

          <button className="md:hidden text-[#F4F6F8]" onClick={() => setMobileOpen(!mobileOpen)}>
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-[#0B0D10]/98 backdrop-blur-lg flex flex-col items-center justify-center gap-6 md:hidden">
          {navLinks.map(({ to, label }) => (
            <Link key={to} to={to} className="text-[#F4F6F8] text-xl font-medium">{label}</Link>
          ))}
          <Link to="/login" className="btn-secondary mt-2">Sign in</Link>
          <Link to="/waitlist" className="btn-primary flex items-center gap-2">Join waitlist <ArrowRight size={16} /></Link>
        </div>
      )}

      {/* Page content */}
      <main>
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-[#0B0D10] border-t border-white/5 py-12 mt-20">
        <div className="max-w-7xl mx-auto px-5 lg:px-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            <div className="col-span-2 md:col-span-1">
              <Link to="/" className="flex items-center gap-2 mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center">
                  <span className="text-[#0B0D10] font-bold text-xs">A</span>
                </div>
                <span className="text-[#F4F6F8] font-semibold">AutoSave</span>
              </Link>
              <p className="text-[#A6AFBA] text-sm leading-relaxed">Effortless M-Pesa savings powered by AI. Built for Kenya.</p>
            </div>
            {[
              { title: 'Product', links: [{ to: '/how-it-works', l: 'How it works' }, { to: '/#features', l: 'Features' }, { to: '/security', l: 'Security' }] },
              { title: 'Company', links: [{ to: '/about', l: 'About us' }, { to: '/support', l: 'Support' }, { to: '/waitlist', l: 'Join waitlist' }] },
              { title: 'Legal', links: [{ to: '/privacy', l: 'Privacy Policy' }, { to: '/terms', l: 'Terms of Service' }] },
            ].map(({ title, links }) => (
              <div key={title}>
                <p className="text-[#F4F6F8] font-medium text-sm mb-3">{title}</p>
                <ul className="space-y-2">
                  {links.map(({ to, l }) => (
                    <li key={l}><Link to={to} className="text-[#A6AFBA] hover:text-[#2EE9A8] text-sm transition-colors">{l}</Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[#A6AFBA] text-xs">© 2025 AutoSave AI. All rights reserved.</p>
            <p className="text-[#A6AFBA] text-xs">Made with ❤️ in Kenya for Africa</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
