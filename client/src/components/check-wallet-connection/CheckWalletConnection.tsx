import React from 'react';
import CheckWalletConnectionProps from './CheckWalletConnection.types';
import * as Styled from './CheckWalletConnection.styles';

const CheckWalletConnection = ({ address, balanceETH, balanceUSD }: CheckWalletConnectionProps) => {
  return (
    <div>
      <Styled.WalletAddress>Wallet address: {address}</Styled.WalletAddress>
      <div>ETH Balance: {balanceETH ? `${balanceETH} ETH` : '—'}</div>
      <div>USD Balance: {balanceUSD ? `$${balanceUSD}` : '—'}</div>
    </div>
  );
};

export default CheckWalletConnection;
