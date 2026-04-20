import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowDownLeft, ArrowUpRight, Clock, CheckCircle, XCircle } from 'lucide-react';
import { useStore } from '../store/useStore';
import { mpesaAPI, transactionAPI } from '../services/api';

const fmt = (n: number) => `KES ${n?.toLocaleString() ?? 0}`;

export default function WalletPage() {
  const { wallet, fetchMe, setNotification } = useStore();
  const [transactions, setTransactions] = useState<any[]>([]);
  const [modal, setModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [amount, setAmount] = useState('');
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const loadTx = async (p = 1) => {
    const res = await transactionAPI.list({ page: p, limit: 15 });
    setTransactions(res.data.transactions);
    setTotalPages(res.data.pages);
    setPage(p);
  };

  useEffect(() => { fetchMe(); loadTx(); }, []);

  const handleAction = async () => {
    const num = parseFloat(amount);
    if (!num || num < 10) return setNotification({ message: 'Minimum amount is KES 10', type: 'error' });
    setLoading(true);
    try {
      if (modal === 'deposit') {
        await mpesaAPI.deposit(num);
        setNotification({ message: 'Check your phone for M-Pesa prompt 📱', type: 'info' });
      } else {
        await mpesaAPI.withdraw(num);
        setNotification({ message: `${fmt(num)} withdrawal initiated ✅`, type: 'success' });
        fetchMe();
        loadTx();
      }
      setModal(null);
      setAmount('');
    } catch (err: any) {
      setNotification({ message: err.response?.data?.message || 'Action failed', type: 'error' });
    } finally {
      setLoading(false);
    }
  };

  const statusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle size={14} className="text-[#2EE9A8]" />;
    if (status === 'failed') return <XCircle size={14} className="text-red-400" />;
    return <Clock size={14} className="text-yellow-400" />;
  };

  const txColor = (type: string) =>
    type === 'deposit' ? 'text-[#2EE9A8]' : type === 'withdrawal' ? 'text-red-400' : 'text-blue-400';

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-[#F4F6F8]">Wallet</h1>

      {/* Balance overview */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { label: 'Available', value: wallet?.balance ?? 0, color: 'text-[#F4F6F8]' },
          { label: 'Saved', value: wallet?.lockedBalance ?? 0, color: 'text-[#2EE9A8]' },
          { label: 'Total Deposited', value: wallet?.totalDeposited ?? 0, color: 'text-blue-400' },
        ].map(({ label, value, color }) => (
          <div key={label} className="card-glass p-5">
            <p className="micro-label mb-2">{label}</p>
            <p className={`text-2xl font-bold ${color}`}>{fmt(value)}</p>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button onClick={() => setModal('deposit')} className="btn-primary flex items-center gap-2 flex-1 justify-center">
          <ArrowDownLeft size={18} /> Deposit
        </button>
        <button onClick={() => setModal('withdraw')} className="btn-secondary flex items-center gap-2 flex-1 justify-center">
          <ArrowUpRight size={18} /> Withdraw
        </button>
      </div>

      {/* Transaction history */}
      <div className="card-glass p-5">
        <p className="text-[#F4F6F8] font-semibold mb-4">Transaction History</p>
        {transactions.length === 0 ? (
          <p className="text-[#A6AFBA] text-sm text-center py-8">No transactions yet</p>
        ) : (
          <div className="space-y-3">
            {transactions.map((tx: any) => (
              <div key={tx._id} className="flex items-center justify-between py-2 border-b border-white/5 last:border-0">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center">
                    {statusIcon(tx.status)}
                  </div>
                  <div>
                    <p className="text-[#F4F6F8] text-sm capitalize">{tx.type.replace('_', ' ')}</p>
                    <p className="text-[#A6AFBA] text-xs">{new Date(tx.createdAt).toLocaleString()}</p>
                    {tx.description && <p className="text-[#A6AFBA] text-xs">{tx.description}</p>}
                  </div>
                </div>
                <div className="text-right">
                  <p className={`font-semibold text-sm ${txColor(tx.type)}`}>
                    {tx.type === 'withdrawal' ? '-' : '+'}{fmt(tx.amount)}
                  </p>
                  <p className="text-[#A6AFBA] text-xs capitalize">{tx.status}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {totalPages > 1 && (
          <div className="flex justify-center gap-2 mt-4">
            <button onClick={() => loadTx(page - 1)} disabled={page === 1} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Prev</button>
            <span className="text-[#A6AFBA] text-xs self-center">{page} / {totalPages}</span>
            <button onClick={() => loadTx(page + 1)} disabled={page === totalPages} className="btn-secondary text-xs py-1.5 px-3 disabled:opacity-40">Next</button>
          </div>
        )}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {modal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center p-4"
            onClick={() => setModal(null)}
          >
            <motion.div
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 40, opacity: 0 }}
              onClick={e => e.stopPropagation()}
              className="card-glass p-6 w-full max-w-sm rounded-[28px]"
            >
              <h3 className="text-[#F4F6F8] font-semibold mb-1">
                {modal === 'deposit' ? 'Deposit via M-Pesa' : 'Withdraw to M-Pesa'}
              </h3>
              <p className="text-[#A6AFBA] text-xs mb-4">
                {modal === 'deposit' ? 'You\'ll receive an M-Pesa STK push on your phone' : `Available: ${fmt(wallet?.balance ?? 0)}`}
              </p>
              <input
                type="number"
                placeholder="Amount (KES)"
                value={amount}
                onChange={e => setAmount(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-[#F4F6F8] placeholder:text-[#A6AFBA]/60 focus:outline-none focus:border-[#2EE9A8]/50 text-sm mb-4"
              />
              <div className="flex gap-3">
                <button onClick={() => setModal(null)} className="btn-secondary flex-1 text-sm py-2.5">Cancel</button>
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
