export default interface EthereumProvider {
  isMetaMask: boolean;
  request: (args: { method: string; params?: any[] | object }) => Promise<any>;
  on: (eventName: string, callback: (...args: any[]) => void) => void;
  removeListener: (eventName: string, callback: (...args: any[]) => void) => void;
}
