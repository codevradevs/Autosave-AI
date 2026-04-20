import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Wallet, Target, BarChart2, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useStore } from '../../store/useStore';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/wallet', icon: Wallet, label: 'Wallet' },
  { to: '/goals', icon: Target, label: 'Goals' },
  { to: '/insights', icon: BarChart2, label: 'Insights' },
  { to: '/profile', icon: User, label: 'Profile' },
];

export default function AppLayout() {
  const { user, notification, logout } = useStore();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = () => { logout(); navigate('/login'); };

  const NavContent = () => (
    <>
      <div className="flex items-center gap-2 mb-10 px-2">
        <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center flex-shrink-0">
          <span className="text-[#0B0D10] font-bold text-sm">A</span>
        </div>
        <span className="text-lg font-semibold text-[#F4F6F8]">AutoSave</span>
      </div>

      <nav className="flex-1 space-y-1">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => setMobileOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? 'bg-[#2EE9A8]/10 text-[#2EE9A8] border border-[#2EE9A8]/20'
                  : 'text-[#A6AFBA] hover:text-[#F4F6F8] hover:bg-white/5'
              }`
            }
          >
            <Icon size={18} />
            {label}
          </NavLink>
        ))}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/10">
        <div className="flex items-center gap-3 px-2 mb-4">
          <div className="w-8 h-8 rounded-full bg-[#2EE9A8]/20 flex items-center justify-center">
            <span className="text-[#2EE9A8] text-sm font-bold">{user?.name?.[0]?.toUpperCase()}</span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-[#F4F6F8] text-sm font-medium truncate">{user?.name}</p>
            <p className="text-[#A6AFBA] text-xs truncate">{user?.phone}</p>
          </div>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-[#A6AFBA] hover:text-red-400 hover:bg-red-400/5 transition-all w-full"
        >
          <LogOut size={18} /> Sign out
        </button>
      </div>
    </>
  );

  return (
    <div className="min-h-screen bg-[#0B0D10] flex">
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-60 bg-[#0F1115] border-r border-white/5 p-5 fixed h-full z-40">
        <NavContent />
      </aside>

      {/* Mobile header */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-[#0F1115]/95 backdrop-blur border-b border-white/5 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center">
            <span className="text-[#0B0D10] font-bold text-xs">A</span>
          </div>
          <span className="text-[#F4F6F8] font-semibold">AutoSave</span>
        </div>
        <button onClick={() => setMobileOpen(!mobileOpen)} className="text-[#F4F6F8]">
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.25 }}
            className="lg:hidden fixed inset-0 z-40 bg-[#0F1115] p-5 flex flex-col pt-16"
          >
            <NavContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <main className="flex-1 lg:ml-60 pt-16 lg:pt-0 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 py-6 lg:px-8 lg:py-8">
          <Outlet />
        </div>
      </main>

      {/* Global notification toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 80, opacity: 0 }}
            className={`fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] px-5 py-3 rounded-full text-sm font-medium shadow-xl ${
              notification.type === 'success' ? 'bg-[#2EE9A8] text-[#0B0D10]' :
              notification.type === 'error' ? 'bg-red-500 text-white' :
              'bg-[#1E2128] text-[#F4F6F8] border border-white/10'
            }`}
          >
            {notification.message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
