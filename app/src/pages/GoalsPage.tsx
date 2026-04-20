import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Target, Trash2, ArrowDownLeft, ArrowUpRight, Lock } from 'lucide-react';
import { goalsAPI } from '../services/api';
import { useStore } from '../store/useStore';

const fmt = (n: number) => `KES ${n?.toLocaleString() ?? 0}`;

const EMOJIS = ['🎯', '💻', '🏠', '🚗', '✈️', '📱', '🎓', '🏥', '💍', '🌍'];

export default function GoalsPage() {
  const { wallet, fetchMe, setNotification } = useStore();
  const [goals, setGoals] = useState<any[]>([]);
  const [showCreate, setShowCreate] = useState(false);
  const [actionModal, setActionModal] = useState<{ goal: any; type: 'contribute' | 'withdraw' } | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ title: '', targetAmount: '', emoji: '🎯', isLocked: false, deadline: '' });

  const load = async () => {
    const res = await goalsAPI.list();
    setGoals(res.data);
  };

  useEffect(() => { load(); }, []);

  const createGoal = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await goalsAPI.create({ ...form, targetAmount: parseFloat(form.targetAmount) });
      setNotification({ message: `Goal "${form.title}" created! 🎯`, type: 'success' });
      setShowCreate(false);
      setForm({ title: '', targetAmount: '', emoji: '🎯', isLocked: false, deadline: '' });
      load();
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Failed to create goal', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async () => {
    if (!actionModal) return;
    const num = parseFloat(amount);
    if (!num || num < 1) return;
    setLoading(true);
    try {
      const res = actionModal.type === 'contribute'
        ? await goalsAPI.contribute(actionModal.goal._id, num)
        : await goalsAPI.withdraw(actionModal.goal._id, num);
      setNotification({ message: res.data.message, type: 'success' });
      setActionModal(null);
      setAmount('');
      load();
      fetchMe();
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Action failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const deleteGoal = async (id: string) => {
    if (!confirm('Delete this goal? Saved funds will return to your balance.')) return;
    try {
      await goalsAPI.delete(id);
      setNotification({ message: 'Goal deleted, funds returned', type: 'info' });
      load();
      fetchMe();
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Delete failed', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-[#F4F6F8]">Goals</h1>
        <button onClick={() => setShowCreate(true)} className="btn-primary text-sm py-2 px-4 flex items-center gap-2">
          <Plus size={16} /> New Goal
        </button>
      </div>

      {goals.length === 0 ? (
        <div className="card-glass p-12 text-center">
          <Target size={40} className="text-[#A6AFBA] mx-auto mb-4" />
          <p className="text-[#F4F6F8] font-medium mb-2">No goals yet</p>
          <p className="text-[#A6AFBA] text-sm">Create a goal and start saving towards it automatically</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {goals.map((goal: any) => {
            const progress = Math.min((goal.savedAmount / goal.targetAmount) * 100, 100);
            return (
              <motion.div
                key={goal._id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                className={`card-glass p-5 ${goal.isCompleted ? 'border-[#2EE9A8]/30' : ''}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{goal.emoji}</span>
                    <div>
                      <p className="text-[#F4F6F8] font-medium text-sm">{goal.title}</p>
                      {goal.isLocked && <div className="flex items-center gap-1 mt-0.5"><Lock size={10} className="text-[#A6AFBA]" /><span className="text-[#A6AFBA] text-xs">Locked</span></div>}
                    </div>
                  </div>
                  {goal.isCompleted && <span className="text-xs bg-[#2EE9A8]/20 text-[#2EE9A8] px-2 py-0.5 rounded-full">Completed 🎉</span>}
                </div>

                <div className="mb-3">
                  <div className="flex justify-between text-xs text-[#A6AFBA] mb-1.5">
                    <span>{fmt(goal.savedAmount)}</span>
                    <span>{fmt(goal.targetAmount)}</span>
                  </div>
                  <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="h-full bg-gradient-to-r from-[#2EE9A8] to-[#1DB584] rounded-full"
                    />
                  </div>
                  <p className="text-[#2EE9A8] text-xs mt-1">{progress.toFixed(0)}% complete</p>
                </div>

                {goal.deadline && (
                  <p className="text-[#A6AFBA] text-xs mb-3">
                    Deadline: {new Date(goal.deadline).toLocaleDateString()}
                  </p>
                )}

                <div className="flex gap-2">
                  <button
                    onClick={() => { setActionModal({ goal, type: 'contribute' }); setAmount(''); }}
                    className="btn-primary text-xs py-1.5 px-3 flex items-center gap-1 flex-1 justify-center"
                  >
                    <ArrowDownLeft size={12} /> Add
                  </button>
                  <button
                    onClick={() => { setActionModal({ goal, type: 'withdraw' }); setAmount(''); }}
                    disabled={goal.isLocked && !goal.isCompleted}
                    className="btn-secondary text-xs py-1.5 px-3 flex items-center gap-1 flex-1 justify-center disabled:opacity-30"
                  >
                    <ArrowUpRight size={12} /> Withdraw
                  </button>
                  <button onClick={() => deleteGoal(goal._id)} className="w-8 h-8 rounded-xl bg-red-500/10 flex items-center justify-center text-red-400 hover:bg-red-500/20 transition-colors">
                    <Trash2 size={14} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Create goal modal */}
      <AnimatePresence>
        {showCreate && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setShowCreate(false)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="card-glass p-6 w-full max-w-sm rounded-[28px]"
            >
              <h3 className="text-[#F4F6F8] font-semibold mb-4">Create a Goal</h3>
              <form onSubmit={createGoal} className="space-y-3">
                <div className="flex gap-2 flex-wrap">
                  {EMOJIS.map(e => (
                    <button key={e} type="button" onClick={() => setForm(f => ({ ...f, emoji: e }))}
                      className={`text-xl p-1.5 rounded-lg transition-all ${form.emoji === e ? 'bg-[#2EE9A8]/20 ring-1 ring-[#2EE9A8]' : 'hover:bg-white/5'}`}>
                      {e}
                    </button>
                  ))}
                </div>
                <input
                  placeholder="Goal name (e.g. New Laptop)"
                  value={form.title}
                  onChange={e => setForm(f => ({ ...f, title: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <input
                  type="number"
                  placeholder="Target amount (KES)"
                  value={form.targetAmount}
                  onChange={e => setForm(f => ({ ...f, targetAmount: e.target.value }))}
                  required
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <input
                  type="date"
                  value={form.deadline}
                  onChange={e => setForm(f => ({ ...f, deadline: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#A6AFBA] focus:outline-none focus:border-[#2EE9A8]/50 text-sm"
                />
                <label className="flex items-center gap-3 cursor-pointer">
                  <div
                    onClick={() => setForm(f => ({ ...f, isLocked: !f.isLocked }))}
                    className={`w-10 h-5 rounded-full transition-all ${form.isLocked ? 'bg-[#2EE9A8]' : 'bg-white/10'} relative`}
                  >
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-all ${form.isLocked ? 'left-5' : 'left-0.5'}`} />
                  </div>
                  <span className="text-[#A6AFBA] text-sm">Lock until goal is reached</span>
                </label>
                <div className="flex gap-3 pt-1">
                  <button type="button" onClick={() => setShowCreate(false)} className="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
                  <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-60">Create</button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Contribute/Withdraw modal */}
      <AnimatePresence>
        {actionModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setActionModal(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="card-glass p-6 w-full max-w-sm rounded-[28px]"
            >
              <h3 className="text-[#F4F6F8] font-semibold mb-1">
                {actionModal.type === 'contribute' ? `Save towards ${actionModal.goal.title}` : `Withdraw from ${actionModal.goal.title}`}
              </h3>
              <p className="text-[#A6AFBA] text-xs mb-4">
                {actionModal.type === 'contribute'
                  ? `Available: ${fmt(wallet?.balance ?? 0)}`
                  : `Saved: ${fmt(actionModal.goal.savedAmount)}`}
              </p>
              <input
                type="number"
                placeholder="Amount (KES)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setActionModal(null)} className="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
                <button onClick={handleAction} disabled={loading} className="btn-primary flex-1 text-sm py-2.5 disabled:opacity-60">
                  {loading ? <span className="w-4 h-4 border-2 border-[#0B0D10]/30 border-t-[#0B0D10] rounded-full animate-spin mx-auto block" /> : 'Confirm'}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
