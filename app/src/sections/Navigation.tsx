import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 100);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) element.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-[1000] transition-all duration-500 ${
        isScrolled ? 'bg-[#0B0D10]/90 backdrop-blur-lg border-b border-white/5' : 'bg-transparent'
      }`}>
        <div className="flex items-center justify-between px-6 lg:px-12 py-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center">
              <span className="text-[#0B0D10] font-bold text-sm">A</span>
            </div>
            <span className="text-xl font-semibold text-[#F4F6F8]">AutoSave</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-[#A6AFBA] hover:text-[#F4F6F8] transition-colors text-sm">
              How it works
            </button>
            <button onClick={() => scrollToSection('security')} className="text-[#A6AFBA] hover:text-[#F4F6F8] transition-colors text-sm">
              Security
            </button>
            <button onClick={() => scrollToSection('support')} className="text-[#A6AFBA] hover:text-[#F4F6F8] transition-colors text-sm">
              Support
            </button>
            <button className="btn-primary text-sm">Join the waitlist</button>
          </div>

          <button className="md:hidden text-[#F4F6F8]" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {isMobileMenuOpen && (
        <div className="fixed inset-0 z-[999] bg-[#0B0D10]/98 backdrop-blur-lg md:hidden">
          <div className="flex flex-col items-center justify-center h-full gap-8">
            <button onClick={() => scrollToSection('how-it-works')} className="text-[#F4F6F8] text-xl">How it works</button>
            <button onClick={() => scrollToSection('security')} className="text-[#F4F6F8] text-xl">Security</button>
            <button onClick={() => scrollToSection('support')} className="text-[#F4F6F8] text-xl">Support</button>
            <button className="btn-primary mt-4">Join the waitlist</button>
          </div>
        </div>
      )}
    </>
  );
}
