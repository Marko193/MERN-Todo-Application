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
    <Styled.SendTransactionsContainer>
      <h3>Send ETH</h3>
      <Styled.FormSection>
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
      </Styled.FormSection>
      <Styled.StatusSection>
        {txStatus !== 'idle' && (
          <Styled.StatusBlock>
            <div>
              <b>Status:</b> <span>{txStatus}</span>
            </div>
            {txHash && (
              <div>
                <b>Tx Hash:</b> <Styled.TxHash>{txHash}</Styled.TxHash>
              </div>
            )}
          </Styled.StatusBlock>
        )}

        {txStatus === 'error' && errorMessage && (
          <Styled.ErrorBlock>Error: {errorMessage}</Styled.ErrorBlock>
        )}
      </Styled.StatusSection>
    </Styled.SendTransactionsContainer>
  );
};

export default SendTransactionForm;
