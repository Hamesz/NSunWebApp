import React from 'react';
import { TrendingUp } from 'lucide-react';
import type { RecommendedMax } from '../types/workout.types';

interface ProgressNotificationProps {
  recommendedMax: RecommendedMax;
  onAccept: () => void;
  onDismiss: () => void;
}

export const ProgressNotification: React.FC<ProgressNotificationProps> = ({
  recommendedMax,
  onAccept,
  onDismiss
}) => {
  return (
    <div className="bg-green-50 border-2 border-green-500 rounded-lg p-3 sm:p-4 mb-4 sm:mb-6 shadow-lg">
      <div className="flex items-start gap-2 sm:gap-3">
        <TrendingUp className="text-green-600 mt-1 flex-shrink-0" size={20} />
        <div className="flex-1 min-w-0">
          <h3 className="font-bold text-green-800 mb-2 text-sm sm:text-base">All Sets Complete! New Training Max Recommended</h3>
          <div className="text-green-700 mb-3 space-y-1 text-xs sm:text-sm">
            <p><strong>Lift:</strong> {recommendedMax.lift}</p>
            <p><strong>1+ AMRAP Reps:</strong> {recommendedMax.repsAchieved}</p>
            <p><strong>Current TM:</strong> {recommendedMax.current} kg</p>
            <p><strong>Recommended TM:</strong> {recommendedMax.recommended} kg</p>
            {recommendedMax.increase > 0 ? (
              <p className="text-xs sm:text-sm font-semibold text-green-600">+{recommendedMax.increase} kg increase</p>
            ) : (
              <p className="text-xs sm:text-sm font-semibold text-orange-600">No increase (0-2 reps on 1+)</p>
            )}
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            {recommendedMax.increase > 0 && (
              <button
                onClick={onAccept}
                className="bg-green-600 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-green-700 transition-colors font-medium text-sm sm:text-base"
              >
                Accept New Training Max
              </button>
            )}
            <button
              onClick={onDismiss}
              className="bg-gray-200 text-gray-700 px-3 sm:px-4 py-2 rounded-lg hover:bg-gray-300 transition-colors font-medium text-sm sm:text-base"
            >
              Dismiss
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
