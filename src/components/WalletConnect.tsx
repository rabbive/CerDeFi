import React from 'react';
import { WalletIcon, AlertCircle } from 'lucide-react';
import { useWallet } from '../hooks/useWallet';

export function WalletConnect() {
  const {
    address,
    isConnected,
    isConnecting,
    isSwitching,
    isCorrectNetwork,
    connect,
    disconnect,
    switchNetwork,
    connectors,
  } = useWallet();

  if (!isConnected) {
    return (
      <div className="flex flex-col gap-4">
        {connectors.map((connector) => (
          <button
            key={connector.uid}
            onClick={() => connect(connector)}
            disabled={isConnecting}
            className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors disabled:opacity-50"
          >
            {isConnecting ? 'Connecting...' : `Connect ${connector.name}`}
          </button>
        ))}
      </div>
    );
  }

  if (!isCorrectNetwork) {
    return (
      <div className="flex items-center gap-2">
        <AlertCircle className="text-yellow-500" size={20} />
        <button
          onClick={switchNetwork}
          disabled={isSwitching}
          className="px-4 py-2 bg-yellow-500 hover:bg-yellow-600 text-white rounded-full transition-colors disabled:opacity-50"
        >
          {isSwitching ? 'Switching Network...' : 'Switch to Polygon Mumbai'}
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center gap-4">
      <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
        <span className="text-sm text-purple-700 dark:text-purple-300">
          {`${address?.slice(0, 6)}...${address?.slice(-4)}`}
        </span>
      </div>
      <button
        onClick={() => disconnect()}
        className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full transition-colors"
      >
        <WalletIcon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
      </button>
    </div>
  );
}