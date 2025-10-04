import React, { useEffect, useState } from 'react';
import { CheckWalletConnection, TransactionsList, SendTransactionForm } from '@/components';
import { connectWallet, fetchETHPrice, getBalance, subscribeWalletEvents } from '@/services';
import * as Styled from './App.styles';

export default function App() {
  const [address, setAddress] = useState<string | null>(null);
  const [balanceETH, setBalanceETH] = useState<string | null>(null);
  const [balanceUSD, setBalanceUSD] = useState<string | null>(null);

  const updateBalance = async (address: string) => {
    try {
      const ethBalance = await getBalance(address);
      setBalanceETH(ethBalance);

      const price = await fetchETHPrice();
      setBalanceUSD((parseFloat(ethBalance) * price).toFixed(2));
    } catch (err) {
      setBalanceETH(null);
      setBalanceUSD(null);
    }
  };

  const initWallet = async () => {
    try {
      const walletData = await connectWallet();
      setAddress(walletData.address);
      await updateBalance(walletData.address);

      subscribeWalletEvents(
        async (accounts: string[]) => {
          if (accounts.length > 0) {
            setAddress(accounts[0]);
            await updateBalance(accounts[0]);
          } else {
            setAddress(null);
            setBalanceETH(null);
            setBalanceUSD(null);
          }
        },
        () => window.location.reload()
      );
    } catch (err) {
      console.error('initWallet error', err);
    }
  };

  useEffect(() => {
    void initWallet();
  }, []);

  useEffect(() => {
    if (!address) return;
    const interval = setInterval(() => updateBalance(address), 10000);
    return () => clearInterval(interval);
  }, [address]);

  return (
    <Styled.RootContainer>
      <h1>Web3 DApp</h1>

      <CheckWalletConnection address={address} balanceETH={balanceETH} balanceUSD={balanceUSD} />

      <Styled.Delimiter />

      {address ? (
        <SendTransactionForm
          senderAddress={address}
          onTxSuccess={async () => {
            await updateBalance(address);
          }}
        />
      ) : (
        <div>Please connect your crypto-wallet to send transactions</div>
      )}

      <TransactionsList />
    </Styled.RootContainer>
  );
}
