import React, { useState } from 'react';
import { addLocalTx, refreshTxStatuses, sendTransaction, setLocalTxById } from '@/services';
import { TxStatus } from '@/types';
import SendTransactionFormProps from './SendTransactionForm.types';
import * as Styled from './SendTransactionForm.styles';

const SendTransactionForm = ({ senderAddress, onTxSuccess }: SendTransactionFormProps) => {
  const [recipient, setRecipient] = useState<string>('');
  const [amount, setAmount] = useState<string>('');
  const [txStatus, setTxStatus] = useState<TxStatus>(TxStatus.Idle);
  const [txHash, setTxHash] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleSend = async () => {
    if (!recipient || !amount) return alert('Please fill recipient and amount');

    const clientId = addLocalTx({
      hash: '',
      to: recipient,
      from: senderAddress,
      amount,
      status: TxStatus.Pending
    });

    try {
      setTxStatus(TxStatus.Pending);
      setErrorMessage(null);

      const { txHash, status } = await sendTransaction(senderAddress, recipient, amount);

      setLocalTxById(clientId, { hash: txHash, status: TxStatus.Pending });

      setTxHash(txHash);

      if (status === TxStatus.Success) {
        setLocalTxById(clientId, { status: TxStatus.Success });
        setTxStatus(TxStatus.Success);
        onTxSuccess?.();
      } else if (status === TxStatus.Pending) {
        await refreshTxStatuses();
        setTxStatus(TxStatus.Pending);
      }
    } catch (err: any) {
      console.error(err);
      setTxStatus(TxStatus.Error);
      setErrorMessage(err?.message || 'Unknown error');

      setLocalTxById(clientId, { status: TxStatus.Error });
    }
  };

  return (
    <div>
      <h3>Send ETH</h3>
      <Styled.AddressInput
        type="text"
        placeholder="Recipient address"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
      />
      <Styled.AmountInput
        type="number"
        placeholder="Amount ETH"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
      <button onClick={handleSend}>Send</button>

      {txStatus !== 'idle' && (
        <Styled.StatusBlock>
          Status: {txStatus} {txHash && <span> | Tx Hash: {txHash}</span>}
        </Styled.StatusBlock>
      )}

      {txStatus === 'error' && errorMessage && (
        <Styled.ErrorBlock>Error: {errorMessage}</Styled.ErrorBlock>
      )}
    </div>
  );
};

export default SendTransactionForm;
