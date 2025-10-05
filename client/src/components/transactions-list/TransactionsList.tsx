import React, { useEffect, useState } from 'react';
import { getLocalTxs, refreshTxStatuses } from '@/services/transactions.service';
import { TransactionItem } from '@/types';
import * as Styled from './TransactionList.styles';

const TransactionsList = () => {
  const [txs, setTxs] = useState<TransactionItem[]>([]);

  const loadLocalTransactions = () => {
    const local = getLocalTxs();
    setTxs(local);
  };

  useEffect(() => {
    const run = async () => {
      await refreshTxStatuses();
      loadLocalTransactions();
      setTxs(getLocalTxs());
    };

    void run();

    const interval = setInterval(run, 15000);
    return () => clearInterval(interval);
  }, []);

  if (!txs.length) return <div>No recent transactions</div>;

  return (
    <div>
      <h4>Recent transactions</h4>
      <ul>
        {txs.map((t) => (
          <Styled.TransactionListItem key={t.hash || `${t.to}-${t.amount}-${t.timestamp}`}>
            <div>
              <strong>To: </strong>
              <Styled.SendAddress>{t.to}</Styled.SendAddress>
            </div>
            <div>
              <strong>Amount:</strong> {t.amount} ETH
            </div>
            <div>
              <strong>Hash:</strong>{' '}
              {t.hash ? (
                <Styled.HashLink
                  href={`https://sepolia.etherscan.io/tx/${t.hash}`}
                  target="_blank"
                  rel="noreferrer">
                  {t.hash}
                </Styled.HashLink>
              ) : (
                '—'
              )}
            </div>
            <div>
              <strong>Status:</strong>{' '}
              <Styled.StatusText $status={t.status}>{t.status}</Styled.StatusText>
            </div>
            <Styled.TransactionTimestamp>
              {new Date(t.timestamp).toLocaleString()}
            </Styled.TransactionTimestamp>
          </Styled.TransactionListItem>
        ))}
      </ul>
    </div>
  );
};

export default TransactionsList;
