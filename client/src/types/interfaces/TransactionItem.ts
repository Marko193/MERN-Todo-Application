import { TxStatus } from '@/types';

export default interface TransactionItem {
  id: string;
  hash: string;
  to: string;
  from?: string;
  amount: string;
  status: TxStatus;
  timestamp: number;
}
