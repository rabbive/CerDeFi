import React from 'react';
import { WagmiProvider, createConfig, http } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { supportedChains, defaultChain } from '../config/chains';
import { injected, walletConnect } from 'wagmi/connectors';

const queryClient = new QueryClient();

const config = createConfig({
  chains: supportedChains,
  transports: {
    [defaultChain.id]: http(),
  },
  connectors: [
    injected(),
    walletConnect({
      projectId: 'YOUR_WALLET_CONNECT_PROJECT_ID', // Replace with actual project ID
    }),
  ],
});

export function Web3Provider({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        {children}
      </QueryClientProvider>
    </WagmiProvider>
  );
}