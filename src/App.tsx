import React, { useState } from 'react';
import { Header } from './components/Header';
import { CreditScoreDisplay } from './components/CreditScoreDisplay';
import { ScoreBreakdown } from './components/ScoreBreakdown';
import { WalletConnect } from './components/WalletConnect';
import { useWallet } from './hooks/useWallet';
import { useCreditScore } from './hooks/useCreditScore';
import { ScoreComponent } from './types';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { address, isConnected, isCorrectNetwork } = useWallet();
  const { score, isLoading } = useCreditScore(address);

  // Mock components data - replace with real data from smart contract
  const mockComponents: ScoreComponent[] = [
    { name: 'Transaction History', value: 255, percentage: 30, color: 'bg-purple-500' },
    { name: 'Wallet Age', value: 128, percentage: 15, color: 'bg-blue-500' },
    { name: 'DeFi Interactions', value: 213, percentage: 25, color: 'bg-green-500' },
    { name: 'Loan Repayment', value: 170, percentage: 20, color: 'bg-yellow-500' },
    { name: 'Transaction Volume', value: 85, percentage: 10, color: 'bg-red-500' },
  ];

  return (
    <div className={isDarkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header
          isConnected={isConnected}
          address={address || ''}
          isDarkMode={isDarkMode}
          toggleDarkMode={() => setIsDarkMode(!isDarkMode)}
        >
          <WalletConnect />
        </Header>
        
        <main className="max-w-7xl mx-auto px-4 py-8">
          {isConnected && isCorrectNetwork ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6 flex flex-col items-center">
                <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">
                  Your Credit Score
                </h2>
                <CreditScoreDisplay score={score || 0} loading={isLoading} />
              </div>
              
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg p-6">
                <ScoreBreakdown components={mockComponents} />
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-4">
                Connect your wallet to view your DeFi Credit Score
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-8">
                Your credit score is calculated based on your on-chain activity
              </p>
              <WalletConnect />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

export default App;