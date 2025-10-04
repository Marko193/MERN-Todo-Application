import { BrowserProvider } from 'ethers';
import { EthereumProvider, TransactionItem, TxStatus } from '@/types';

const STORAGE_KEY = 'recent_txs_v1';
const windowObject = window as Window & { ethereum?: EthereumProvider };

const makeId = () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

const readFromStorage = (): TransactionItem[] => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    return JSON.parse(raw) as TransactionItem[];
  } catch {
    return [];
  }
};

const writeToStorage = (items: TransactionItem[]) => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  } catch (e) {
    console.warn('Failed to write txs to localStorage', e);
  }
};

const getLocalTxs = (): TransactionItem[] => readFromStorage();

const addLocalTx = (tx: Omit<TransactionItem, 'id' | 'timestamp'>): string => {
  const items = readFromStorage();
  const id = makeId();
  const item: TransactionItem = {
    id,
    timestamp: Date.now(),
    hash: tx.hash ?? '',
    to: tx.to,
    from: tx.from,
    amount: tx.amount,
    status: tx.status ?? TxStatus.Pending
  };
  items.unshift(item);
  writeToStorage(items.slice(0, 200));
  return id;
};

const setLocalTxById = (id: string, patch: Partial<TransactionItem>) => {
  const items = readFromStorage();
  const idx = items.findIndex((t) => t.id === id);
  if (idx === -1) return;
  items[idx] = { ...items[idx], ...patch };
  writeToStorage(items);
};

const setLocalTxByHash = (hash: string, patch: Partial<TransactionItem>) => {
  const items = readFromStorage();
  const idx = items.findIndex((t) => t.hash === hash);
  if (idx === -1) return;
  items[idx] = { ...items[idx], ...patch };
  writeToStorage(items);
};

const refreshTxStatuses = async (): Promise<TransactionItem[]> => {
  const items = readFromStorage();
  if (!windowObject.ethereum) return items;

  const provider = new BrowserProvider(windowObject.ethereum);
  const updated = await Promise.all(
    items.map(async (t) => {
      if (t.hash && t.status === TxStatus.Pending) {
        try {
          const receipt = await provider.getTransactionReceipt(t.hash);
          if (!receipt) {
            return t;
          }
          const status = receipt.status === 1 ? TxStatus.Success : TxStatus.Error;
          return { ...t, status };
        } catch (err) {
          console.warn('refreshTxStatuses error for', t.hash, err);
          return t;
        }
      }
      return t;
    })
  );

  writeToStorage(updated);
  return updated;
};

export { addLocalTx, getLocalTxs, refreshTxStatuses, setLocalTxByHash, setLocalTxById };
