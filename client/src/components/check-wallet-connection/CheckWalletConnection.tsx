import React from 'react';
import CheckWalletConnectionProps from './CheckWalletConnection.types';

const CheckWalletConnection = ({ address, balanceETH, balanceUSD }: CheckWalletConnectionProps) => {
  return (
    <div>
      <div>Wallet address: {address}</div>
      <div>ETH Balance: {balanceETH ? `${balanceETH} ETH` : '—'}</div>
      <div>USD Balance: {balanceUSD ? `$${balanceUSD}` : '—'}</div>
    </div>
  );
};

export default CheckWalletConnection;
