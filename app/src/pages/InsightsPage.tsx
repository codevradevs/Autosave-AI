import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Brain, TrendingUp, Shield, Zap, Target, AlertCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { autosaveAPI } from '../services/api';

const fmt = (n: number) => `KES ${n?.toLocaleString() ?? 0}`;

export default function InsightsPage() {
  const { insights, user, wallet, fetchInsights, setNotification } = useStore();

  useEffect(() => { fetchInsights(); }, []);

  const profile = (insights as any)?.profile;

  const savingLabel = {
    low: { label: 'Conservative', color: 'text-blue-400', bg: 'bg-blue-400/10' },
    medium: { label: 'Balanced', color: 'text-[#2EE9A8]', bg: 'bg-[#2EE9A8]/10' },
    aggressive: { label: 'Aggressive', color: 'text-orange-400', bg: 'bg-orange-400/10' },
  }[user?.savingPreference ?? 'medium'];

  const riskLabel = profile?.riskScore >= 0.7 ? 'Stable' : profile?.riskScore >= 0.4 ? 'Moderate' : 'Volatile';
  const riskColor = profile?.riskScore >= 0.7 ? 'text-[#2EE9A8]' : profile?.riskScore >= 0.4 ? 'text-yellow-400' : 'text-red-400';

  const handlePreference = async (pref: string) => {
    try {
      await autosaveAPI.setPreference(pref);
      setNotification({ message: `Saving mode set to ${pref}`, type: 'success' });
      fetchInsights();
    } catch {
      setNotification({ message: 'Failed to update preference', type: 'error' });
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl bg-[#2EE9A8]/10 flex items-center justify-center">
          <Brain size={20} className="text-[#2EE9A8]" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-[#F4F6F8]">AI Insights</h1>
          <p className="text-[#A6AFBA] text-xs">Your financial behavior engine</p>
        </div>
      </div>

      {/* Savings summary */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        {[
          { label: 'Today', value: fmt(insights?.todaySaved ?? 0), icon: Zap },
          { label: 'This Week', value: fmt(insights?.weekSaved ?? 0), icon: TrendingUp },
          { label: 'This Month', value: fmt(insights?.monthSaved ?? 0), icon: Target },
          { label: 'All Time', value: fmt(insights?.totalSaved ?? 0), icon: Shield },
        ].map(({ label, value, icon: Icon }) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="card-glass p-4 text-center"
          >
            <Icon size={16} className="text-[#2EE9A8] mx-auto mb-2" />
            <p className="text-[#F4F6F8] font-bold">{value}</p>
            <p className="text-[#A6AFBA] text-xs mt-1">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* AI Status card */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className={`card-glass p-5 border ${insights?.canSaveNow ? 'border-[#2EE9A8]/20' : 'border-yellow-400/20'}`}
      >
        <div className="flex items-center gap-3 mb-3">
          {insights?.canSaveNow
            ? <div className="w-2 h-2 rounded-full bg-[#2EE9A8] animate-pulse" />
            : <AlertCircle size={16} className="text-yellow-400" />}
          <p className="text-[#F4F6F8] font-medium text-sm">
            {insights?.canSaveNow ? 'Safe to save right now' : 'Saving paused — balance too low'}
          </p>
        </div>
        {insights?.canSaveNow && (
          <p className="text-[#A6AFBA] text-sm">
            AI recommends saving <span className="text-[#2EE9A8] font-semibold">{fmt(insights.dailySavingCapacity)}</span> right now based on your balance and spending patterns.
          </p>
        )}
      </motion.div>

      {/* Financial profile */}
      {profile && (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15 }}
          className="card-glass p-5"
        >
          <p className="text-[#F4F6F8] font-semibold mb-4">Your Financial Profile</p>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-[#A6AFBA] text-xs mb-1">Avg Income</p>
              <p className="text-[#F4F6F8] font-semibold">{fmt(profile.avgIncome)}</p>
            </div>
            <div>
              <p className="text-[#A6AFBA] text-xs mb-1">Income Frequency</p>
              <p className="text-[#F4F6F8] font-semibold capitalize">{profile.incomeFrequency || 'Unknown'}</p>
            </div>
            <div>
              <p className="text-[#A6AFBA] text-xs mb-1">Safety Buffer</p>
              <p className="text-[#F4F6F8] font-semibold">{fmt(profile.minBalance)}</p>
            </div>
            <div>
              <p className="text-[#A6AFBA] text-xs mb-1">Income Stability</p>
              <p className={`font-semibold ${riskColor}`}>{riskLabel}</p>
            </div>
          </div>

          {/* Risk score bar */}
          <div className="mt-4">
            <div className="flex justify-between text-xs text-[#A6AFBA] mb-1.5">
              <span>Income Stability Score</span>
              <span>{((profile.riskScore || 0) * 100).toFixed(0)}%</span>
            </div>
            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: `${(profile.riskScore || 0) * 100}%` }}
                transition={{ duration: 1, ease: 'easeOut' }}
                className="h-full bg-gradient-to-r from-[#2EE9A8] to-[#1DB584] rounded-full"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* Saving mode selector */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card-glass p-5"
      >
        <p className="text-[#F4F6F8] font-semibold mb-1">Saving Mode</p>
        <p className="text-[#A6AFBA] text-xs mb-4">Controls how aggressively AI saves for you</p>
        <div className="grid grid-cols-3 gap-3">
          {[
            { key: 'low', label: 'Conservative', desc: '2% of balance', color: 'blue' },
            { key: 'medium', label: 'Balanced', desc: '5% of balance', color: 'green' },
            { key: 'aggressive', label: 'Aggressive', desc: '10% of balance', color: 'orange' },
          ].map(({ key, label, desc, color }) => (
            <button
              key={key}
              onClick={() => handlePreference(key)}
              className={`p-3 rounded-xl border text-left transition-all ${
                user?.savingPreference === key
                  ? `border-[#2EE9A8]/50 bg-[#2EE9A8]/10`
                  : 'border-white/10 bg-white/5 hover:bg-white/10'
              }`}
            >
              <p className="text-[#F4F6F8] text-xs font-medium">{label}</p>
              <p className="text-[#A6AFBA] text-xs mt-0.5">{desc}</p>
            </button>
          ))}
        </div>
      </motion.div>

      {/* Smart tips */}
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="card-glass p-5"
      >
        <p className="text-[#F4F6F8] font-semibold mb-3">AI Tips</p>
        <div className="space-y-3">
          {[
            insights?.canSaveNow
              ? `💡 Your balance is healthy. AutoSave will save ${fmt(insights.dailySavingCapacity)} next cycle.`
              : '⚠️ Balance is below safety threshold. Deposit to resume AutoSave.',
            profile?.incomeFrequency === 'weekly'
              ? '📅 Weekly income detected. AutoSave is optimized to save right after deposits.'
              : '📅 Deposit regularly to help AI learn your income patterns.',
            `🎯 You've saved ${fmt(insights?.totalSaved ?? 0)} total. Keep going!`,
          ].map((tip, i) => (
            <div key={i} className="flex gap-3 p-3 rounded-xl bg-white/5">
              <p className="text-[#A6AFBA] text-sm">{tip}</p>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
