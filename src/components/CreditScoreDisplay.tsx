import React from 'react';
import { CircleIcon } from 'lucide-react';

interface CreditScoreDisplayProps {
  score: number;
  loading?: boolean;
}

export function CreditScoreDisplay({ score, loading = false }: CreditScoreDisplayProps) {
  const getScoreColor = (score: number) => {
    if (score >= 700) return 'text-green-500';
    if (score >= 600) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 700) return 'Excellent';
    if (score >= 600) return 'Good';
    return 'Needs Improvement';
  };

  return (
    <div className="relative w-64 h-64">
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          {loading ? (
            <div className="animate-pulse">
              <div className="h-12 w-24 bg-gray-200 rounded mb-2"></div>
              <div className="h-4 w-16 bg-gray-200 rounded mx-auto"></div>
            </div>
          ) : (
            <>
              <h2 className={`text-5xl font-bold ${getScoreColor(score)}`}>
                {score}
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mt-2">
                {getScoreLabel(score)}
              </p>
            </>
          )}
        </div>
      </div>
      <svg className="transform -rotate-90 w-64 h-64">
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className="text-gray-200 dark:text-gray-700"
          style={{
            transform: 'scale(3.5) translate(16px, 16px)',
          }}
        />
        <circle
          cx="32"
          cy="32"
          r="30"
          fill="none"
          stroke="currentColor"
          strokeWidth="4"
          className={getScoreColor(score)}
          strokeDasharray={`${(score - 300) / 550 * 188.5} 188.5`}
          style={{
            transform: 'scale(3.5) translate(16px, 16px)',
            transition: 'stroke-dasharray 0.5s ease-in-out',
          }}
        />
      </svg>
    </div>
  );
}