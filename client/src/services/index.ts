import {
  connectWallet,
  getBalance,
  subscribeWalletEvents,
  sendTransaction
} from './connect-wallet.service';
import fetchETHPrice from './fetch-eth-price.service';
import {
  addLocalTx,
  getLocalTxs,
  refreshTxStatuses,
  setLocalTxByHash,
  setLocalTxById
} from './transactions.service';

export {
  addLocalTx,
  getLocalTxs,
  refreshTxStatuses,
  setLocalTxByHash,
  setLocalTxById,
  connectWallet,
  fetchETHPrice,
  getBalance,
  subscribeWalletEvents,
  sendTransaction
};
