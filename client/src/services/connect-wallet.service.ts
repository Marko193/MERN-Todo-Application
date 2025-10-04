import { BrowserProvider } from 'ethers';
import { EthereumProvider, TxStatus, WalletData } from '@/types';

const windowObject = window as Window & { ethereum?: EthereumProvider };

const connectWallet = async (): Promise<WalletData> => {
  if (!windowObject.ethereum) throw new Error("MetaMask isn't installed");

  await windowObject.ethereum.request({ method: 'eth_requestAccounts' });
  const provider = new BrowserProvider(windowObject.ethereum);
  const signer = await provider.getSigner();
  const address = await signer.getAddress();

  const balanceRaw = await provider.getBalance(address);
  const balanceETH = parseFloat(balanceRaw.toString()) / 1e18 + '';

  return { address, balanceETH };
};

const getBalance = async (address: string): Promise<string> => {
  const provider = new BrowserProvider(windowObject.ethereum!);
  const balanceRaw = await provider.getBalance(address);
  return (parseFloat(balanceRaw.toString()) / 1e18).toFixed(5);
};

const subscribeWalletEvents = (
  onAccountsChanged: (accounts: string[]) => void,
  onChainChanged: () => void
) => {
  windowObject.ethereum?.on?.('accountsChanged', onAccountsChanged);
  windowObject.ethereum?.on?.('chainChanged', onChainChanged);
};

const sendTransaction = async (
  senderAddress: string,
  recipient: string,
  amountETH: string
): Promise<{ txHash: string; status: TxStatus }> => {
  if (!windowObject.ethereum) throw new Error('MetaMask not installed');

  const provider = new BrowserProvider(windowObject.ethereum);
  const signer = await provider.getSigner();

  const signerAddress = await signer.getAddress();
  if (signerAddress.toLowerCase() !== senderAddress.toLowerCase()) {
    throw new Error('Connected wallet does not match sender address');
  }

  try {
    const tx = await signer.sendTransaction({
      to: recipient,
      value: BigInt(Math.floor(parseFloat(amountETH) * 1e18))
    });

    await tx.wait();

    return { txHash: tx.hash, status: TxStatus.Success };
  } catch (error: any) {
    console.error('Transaction failed:', error);
    throw error;
  }
};

export { connectWallet, getBalance, subscribeWalletEvents, sendTransaction };
