import React from 'react';
import { WalletIcon, Moon, Sun } from 'lucide-react';

interface HeaderProps {
  isConnected: boolean;
  address: string;
  onConnect: () => void;
  isDarkMode: boolean;
  toggleDarkMode: () => void;
}

export function Header({ isConnected, address, onConnect, isDarkMode, toggleDarkMode }: HeaderProps) {
  return (
    <header className="w-full px-6 py-4 bg-white dark:bg-gray-800 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <WalletIcon className="w-8 h-8 text-purple-600 dark:text-purple-400" />
          <h1 className="text-xl font-bold text-gray-800 dark:text-white">DeFi Credit Score</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleDarkMode}
            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            {isDarkMode ? (
              <Sun className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600 dark:text-gray-300" />
            )}
          </button>
          
          {isConnected ? (
            <div className="px-4 py-2 bg-purple-100 dark:bg-purple-900 rounded-full">
              <span className="text-sm text-purple-700 dark:text-purple-300">
                {`${address.slice(0, 6)}...${address.slice(-4)}`}
              </span>
            </div>
          ) : (
            <button
              onClick={onConnect}
              className="px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-full transition-colors"
            >
              Connect Wallet
            </button>
          )}
        </div>
      </div>
    </header>
  );
}