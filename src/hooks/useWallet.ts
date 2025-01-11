import { useAccount, useConnect, useDisconnect, useChainId, useSwitchChain } from 'wagmi';
import { supportedChains, defaultChain } from '../config/chains';

export function useWallet() {
  const { address, isConnected, status } = useAccount();
  const { connect, connectors, isPending: isConnecting } = useConnect();
  const { disconnect } = useDisconnect();
  const chainId = useChainId();
  const { switchChain, isPending: isSwitching } = useSwitchChain();

  const isCorrectNetwork = chainId === defaultChain.id;

  const handleConnect = async (connector = connectors[0]) => {
    try {
      await connect({ connector });
    } catch (error) {
      console.error('Failed to connect wallet:', error);
    }
  };

  const handleSwitchNetwork = async () => {
    if (switchChain) {
      try {
        await switchChain({ chainId: defaultChain.id });
      } catch (error) {
        console.error('Failed to switch network:', error);
      }
    }
  };

  return {
    address,
    isConnected,
    isConnecting,
    isSwitching,
    isCorrectNetwork,
    status,
    connect: handleConnect,
    disconnect,
    switchNetwork: handleSwitchNetwork,
    connectors,
  };
}