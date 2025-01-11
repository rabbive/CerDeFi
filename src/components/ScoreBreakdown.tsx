import React from 'react';
import { ScoreComponent } from '../types';

interface ScoreBreakdownProps {
  components: ScoreComponent[];
}

export function ScoreBreakdown({ components }: ScoreBreakdownProps) {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white">Score Breakdown</h3>
      <div className="space-y-3">
        {components.map((component) => (
          <div key={component.name} className="space-y-1">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600 dark:text-gray-400">{component.name}</span>
              <span className="font-medium text-gray-800 dark:text-gray-200">
                {component.value} ({component.percentage}%)
              </span>
            </div>
            <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${component.color}`}
                style={{ width: `${(component.value / 850) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}