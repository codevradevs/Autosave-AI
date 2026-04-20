import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, Zap, Lock, ArrowUpRight, ArrowDownLeft, Sparkles } from 'lucide-react';
import { useStore } from '../store/useStore';
import { autosaveAPI, transactionAPI } from '../services/api';

const fmt = (n: number) => `KES ${n?.toLocaleString() ?? 0}`;

export default function Dashboard() {
  const { user, wallet, insights, fetchMe, fetchInsights, setNotification } = useStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchMe();
    fetchInsights();
    transactionAPI.list({ limit: 5 }).then(r => setTransactions(r.data.transactions));
  }, []);

  const handleManualSave = async () => {
    setSaving(true);
    try {
      const res = await autosaveAPI.trigger();
      setNotification({ message: `Saved ${fmt(res.data.saveAmount)} 🎉`, type: 'success' });
      fetchMe();
      fetchInsights();
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Cannot save right now', type: 'error' });
    } finally {
      setSaving(false);
    }
  };

  const txIcon = (type: string) => {
    if (type === 'deposit') return <ArrowDownLeft size={14} className="text-[#2EE9A8]" />;
    if (type === 'withdrawal') return <ArrowUpRight size={14} className="text-red-400" />;
    return <Zap size={14} className="text-blue-400" />;
  };

  const txColor = (type: string) =>
    type === 'deposit' ? 'text-[#2EE9A8]' : type === 'withdrawal' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className="space-y-6">
      <div>
        <p className="text-[#A6AFBA] text-sm">Good {new Date().getHours() < 12 ? 'morning' : new Date().getHours() < 17 ? 'afternoon' : 'evening'},</p>
        <h1 className="text-2xl font-bold text-[#F4F6F8]">{user?.name?.split(' ')[0]} 👋</h1>
      </div>

      {/* Balance cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="card-glass p-6"
        >
          <p className="micro-label mb-3">Available Balance</p>
          <p className="text-4xl font-bold text-[#F4F6F8]">{fmt(wallet?.balance ?? 0)}</p>
          <p className="text-[#A6AFBA] text-xs mt-2">Ready to use or save</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="rounded-[28px] p-6 bg-gradient-to-br from-[#2EE9A8]/20 to-[#1DB584]/10 border border-[#2EE9A8]/20"
        >
          <div className="flex items-center gap-2 mb-3">
            <Lock size={14} className="text-[#2EE9A8]" />
            <p className="micro-label">Saved (Locked)</p>
          </div>
          <p className="text-4xl font-bold text-[#2EE9A8]">{fmt(wallet?.lockedBalance ?? 0)}</p>
          <p className="text-[#A6AFBA] text-xs mt-2">Growing for your goals</p>
        </motion.div>
      </div>

      {/* Insights strip */}
      {insights && (
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-3"
        >
          {[
            { label: 'Today', value: fmt(insights.todaySaved) },
            { label: 'This Week', value: fmt(insights.weekSaved) },
            { label: 'This Month', value: fmt(insights.monthSaved) },
          ].map(({ label, value }) => (
            <div key={label} className="card-glass p-4 text-center">
              <p className="text-[#2EE9A8] font-bold text-lg">{value}</p>
              <p className="text-[#A6AFBA] text-xs mt-1">{label}</p>
            </div>
          ))}
        </motion.div>
      )}

      {/* AutoSave status + trigger */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="card-glass p-5 flex items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#2EE9A8]/10 flex items-center justify-center">
            <Sparkles size={20} className="text-[#2EE9A8]" />
          </div>
          <div>
            <p className="text-[#F4F6F8] font-medium text-sm">AI AutoSave</p>
            <p className="text-[#A6AFBA] text-xs">
              {insights?.canSaveNow
                ? `Can save ${fmt(insights.dailySavingCapacity)} right now`
                : 'Balance too low — saving paused'}
            </p>
          </div>
        </div>
        <button
          onClick={handleManualSave}
          disabled={saving || !insights?.canSaveNow}
          className="btn-primary text-sm py-2 px-4 disabled:opacity-40 flex items-center gap-2"
        >
          {saving ? <span className="w-3 h-3 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin" /> : <Zap size={14} />}
          Save Now
        </button>
      </motion.div>

      {/* Recent transactions */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass p-5"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="text-[#F4F6F8] font-semibold">Recent Activity</p>
          <TrendingUp size={16} className="text-[#A6AFBA]" />
        </div>

        {transactions.length === 0 ? (
          <p className="text-[#A6AFBA] text-sm text-center py-6">No transactions yet. Deposit to get started!</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx: any) => (
              <div key={tx._id} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    {txIcon(tx.type)}
                  </div>
                  <div>
                    <p className="text-[#F4F6F8] text-sm capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-[#A6AFBA] text-xs">{new Date(tx.createdAt).toLocaleDateString()}</p>
                  </div>
                </div>
                <p className={`font-semibold text-sm ${txColor(tx.type)}`}>
                  {tx.type === 'withdrawal' ? '-' : '+'}{fmt(tx.amount)}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}
