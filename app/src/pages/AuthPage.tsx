import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap } from 'lucide-react';
import { authAPI } from '../services/api';
import { useStore } from '../store/useStore';

const DEMO_ACCOUNTS = [
  { name: 'Wanjiku Muthoni', phone: '0712345678', pin: '1234', tag: 'Medium saver' },
  { name: 'James Ochieng',   phone: '0723456789', pin: '1234', tag: 'Aggressive' },
  { name: 'Amina Hassan',    phone: '0734567890', pin: '1234', tag: 'Conservative' },
];

export default function AuthPage() {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [form, setForm] = useState({ name: '', phone: '', pin: '', email: '' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const { setToken, setUser, setWallet } = useStore();

  const handle = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));

  const loginAsDemo = async (phone: string, pin: string) => {
    setLoading(true);
    setError('');
    setMode('login');
    try {
      const res = await authAPI.login({ phone, pin });
      setToken(res.data.token);
      setUser(res.data.user);
      if (res.data.wallet) setWallet(res.data.wallet);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Demo login failed');
    } finally {
      setLoading(false);
    }
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = mode === 'login'
        ? await authAPI.login({ phone: form.phone, pin: form.pin })
        : await authAPI.register(form);
      setToken(res.data.token);
      setUser(res.data.user);
      if (res.data.wallet) setWallet(res.data.wallet);
      navigate('/dashboard');
    } catch (err: any) {
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0B0D10] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-gradient-radial from-[#2EE9A8]/5 via-transparent to-transparent" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#2EE9A8] to-[#1DB584] flex items-center justify-center mx-auto mb-4">
            <span className="text-[#0B0D10] font-bold text-xl">A</span>
          </div>
          <h1 className="text-2xl font-bold text-[#F4F6F8]">AutoSave AI</h1>
          <p className="text-[#A6AFBA] text-sm mt-1">Save without thinking.</p>
        </div>

        <div className="card-glass p-6">
          <div className="flex gap-2 mb-6 p-1 rounded-full bg-white/5">
            {(['login', 'register'] as const).map(m => (
              <button
                key={m}
                onClick={() => setMode(m)}
                className={`flex-1 py-2 rounded-full text-sm font-medium transition-all ${mode === m ? 'bg-[#2EE9A8] text-[#0B0D10]' : 'text-[#A6AFBA]'}`}
              >
                {m === 'login' ? 'Sign In' : 'Create Account'}
              </button>
            ))}
          </div>

          <form onSubmit={submit} className="space-y-4">
            <AnimatePresence mode="wait">
              {mode === 'register' && (
                <motion.div
                  key="name"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  exit={{ opacity: 0, height: 0 }}
                >
                  <input
                    name="name"
                    placeholder="Full name"
                    value={form.name}
                    onChange={handle}
                    required
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                  />
                </motion.div>
              )}
            </AnimatePresence>

            <input
              name="phone"
              placeholder="Phone (e.g. 0712345678)"
              value={form.phone}
              onChange={handle}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
            />

            <input
              name="pin"
              type="password"
              placeholder="4-digit PIN"
              value={form.pin}
              onChange={handle}
              maxLength={6}
              required
              className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
            />

            {error && (
              <p className="text-red-400 text-xs text-center">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="btn-primary w-full flex items-center justify-center gap-2 disabled:opacity-60"
            >
              {loading ? (
                <span className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" />
              ) : mode === 'login' ? 'Sign In' : 'Create Account'}
            </button>
          </form>

          {mode === 'login' && (
            <div className="mt-5">
              <div className="flex items-center gap-3 mb-3">
                <div className="flex-1 h-px bg-white/10" />
                <span className="text-[#A6AFBA] text-xs flex items-center gap-1">
                  <Zap size={11} className="text-[#2EE9A8]" /> Demo accounts
                </span>
                <div className="flex-1 h-px bg-white/10" />
              </div>
              <div className="space-y-2">
                {DEMO_ACCOUNTS.map(acc => (
                  <button
                    key={acc.phone}
                    onClick={() => loginAsDemo(acc.phone, acc.pin)}
                    disabled={loading}
                    className="w-full flex items-center justify-between px-3 py-2.5 rounded-xl bg-white/5 border border-white/10 hover:border-[#2EE9A8]/30 hover:bg-[#2EE9A8]/5 transition-all disabled:opacity-50 group"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-full bg-[#2EE9A8]/15 flex items-center justify-center flex-shrink-0">
                        <span className="text-[#2EE9A8] text-xs font-bold">{acc.name[0]}</span>
                      </div>
                      <div className="text-left">
                        <p className="text-[#F4F6F8] text-xs font-medium">{acc.name}</p>
                        <p className="text-[#A6AFBA] text-[10px]">{acc.phone}</p>
                      </div>
                    </div>
                    <span className="text-[10px] text-[#2EE9A8]/70 bg-[#2EE9A8]/10 px-2 py-0.5 rounded-full">
                      {acc.tag}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
}
