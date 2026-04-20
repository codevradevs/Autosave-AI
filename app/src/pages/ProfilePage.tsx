import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { User, Phone, Mail, Smartphone, ToggleLeft, ToggleRight, Save } from 'lucide-react';
import { useStore } from '../store/useStore';
import { authAPI, autosaveAPI } from '../services/api';

export default function ProfilePage() {
  const { user, wallet, setNotification, setUser } = useStore();
  const [form, setForm] = useState({ name: '', email: '', mpesaNumber: '' });
  const [loading, setLoading] = useState(false);
  const [toggling, setToggling] = useState(false);

  useEffect(() => {
    if (user) setForm({ name: user.name || '', email: user.email || '', mpesaNumber: '' });
  }, [user]);

  const saveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authAPI.updateProfile(form);
      setUser({ ...user!, ...res.data });
      setNotification({ message: 'Profile updated ✅', type: 'success' });
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Update failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const toggleAutoSave = async () => {
    setToggling(true);
    try {
      const res = await autosaveAPI.toggle();
      setUser({ ...user!, autoSaveEnabled: res.data.autoSaveEnabled });
      setNotification({
        message: res.data.autoSaveEnabled ? 'AutoSave enabled 🟢' : 'AutoSave paused ⏸️',
        type: 'info'
      });
    } catch {
      setNotification({ message: 'Failed to toggle AutoSave', type: 'error' });
    } finally {
      setToggling(false);
    }
  };

  const fmt = (n: number) => `KES ${n?.toLocaleString() ?? 0}`;

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#F4F6F8]">Profile</h1>

      {/* Avatar + stats */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        className="card-glass p-6 flex items-center gap-5"
      >
        <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center flex-shrink-0">
          <span className="text-[#0B0D10] font-bold text-2xl">{user?.name?.[0]?.toUpperCase()}</span>
        </div>
        <div className="flex-1">
          <p className="text-[#F4F6F8] font-bold text-lg">{user?.name}</p>
          <p className="text-[#A6AFBA] text-sm">{user?.phone}</p>
          <div className="flex gap-4 mt-2">
            <div>
              <p className="text-[#2EE9A8] font-semibold text-sm">{fmt(wallet?.totalSaved ?? 0)}</p>
              <p className="text-[#A6AFBA] text-xs">Total Saved</p>
            </div>
            <div>
              <p className="text-[#F4F6F8] font-semibold text-sm">{fmt(wallet?.balance ?? 0)}</p>
              <p className="text-[#A6AFBA] text-xs">Balance</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* AutoSave toggle */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className="card-glass p-5 flex items-center justify-between"
      >
        <div>
          <p className="text-[#F4F6F8] font-medium">AutoSave</p>
          <p className="text-[#A6AFBA] text-xs mt-0.5">
            {user?.autoSaveEnabled ? 'AI is actively saving for you' : 'AutoSave is paused'}
          </p>
        </div>
        <button onClick={toggleAutoSave} disabled={toggling} className="disabled:opacity-60">
          {user?.autoSaveEnabled
            ? <ToggleRight size={36} className="text-[#2EE9A8]" />
            : <ToggleLeft size={36} className="text-[#A6AFBA]" />}
        </button>
      </motion.div>

      {/* Edit profile form */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card-glass p-5"
      >
        <p className="text-[#F4F6F8] font-semibold mb-4">Edit Profile</p>
        <form onSubmit={saveProfile} className="space-y-3">
          <div className="relative">
            <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6AFBA]" />
            <input
              placeholder="Full name"
              value={form.name}
              onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
            />
          </div>
          <div className="relative">
            <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6AFBA]" />
            <input
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
            />
          </div>
          <div className="relative">
            <Smartphone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-[#A6AFBA]" />
            <input
              placeholder="M-Pesa number (if different)"
              value={form.mpesaNumber}
              onChange={e => setForm(f => ({ ...f, mpesaNumber: e.target.value }))}
              className="w-full pl-9 pr-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
            />
          </div>
          <button type="submit" disabled={loading} className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60">
            {loading
              ? <span className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" />
              : <><Save size={16} /> Save Changes</>}
          </button>
        </form>
      </motion.div>

      {/* Account info */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-glass p-5"
      >
        <p className="text-[#F4F6F8] font-semibold mb-3">Account Info</p>
        <div className="space-y-3">
          {[
            { icon: Phone, label: 'Phone', value: user?.phone },
            { icon: Mail, label: 'Email', value: user?.email || 'Not set' },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center">
                <Icon size={14} className="text-[#A6AFBA]" />
              </div>
              <div>
                <p className="text-[#A6AFBA] text-xs">{label}</p>
                <p className="text-[#F4F6F8] text-sm">{value}</p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
