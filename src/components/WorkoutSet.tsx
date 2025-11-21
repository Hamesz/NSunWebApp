import React from 'react';
import { Check, X } from 'lucide-react';
import type { TierType, DayName, AmrapReps, CompletedSets } from '../types/workout.types';
import { calculateWeight } from '../utils/workout.utils';

interface WorkoutSetProps {
  day: DayName;
  tier: TierType;
  pct: number;
  reps: number | string;
  idx: number;
  tm: number;
  completedSets: CompletedSets;
  amrapReps: AmrapReps;
  onToggleSet: (day: DayName, tier: TierType, setIndex: number) => void;
  onUpdateAmrapReps: (day: DayName, tier: TierType, setIndex: number, reps: string) => void;
}

export const WorkoutSet: React.FC<WorkoutSetProps> = ({
  day,
  tier,
  pct,
  reps,
  idx,
  tm,
  completedSets,
  amrapReps,
  onToggleSet,
  onUpdateAmrapReps
}) => {
  const weight = calculateWeight(tm, pct);
  const key = `${day}-${tier}-${idx}`;
  const isCompleted = completedSets[key];
  const isOnePlusAmrap = tier === 't1' && reps === '1+';

  return (
    <div className="flex items-center justify-between p-3 sm:p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors gap-2">
      <div className="flex items-center gap-2 sm:gap-3">
        <button
          onClick={() => onToggleSet(day, tier, idx)}
          className={`w-10 h-10 sm:w-8 sm:h-8 rounded-full flex items-center justify-center transition-all flex-shrink-0 ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isCompleted ? <Check size={18} /> : <X size={18} />}
        </button>
        <span className="text-gray-700 font-medium text-sm sm:text-base whitespace-nowrap">Set {idx + 1}</span>
      </div>
      <div className="flex items-center gap-2 sm:gap-4">
        <span className="text-gray-600 font-semibold text-sm sm:text-base whitespace-nowrap">{weight} kg</span>
        {isOnePlusAmrap ? (
          <div className="flex items-center gap-1 sm:gap-2">
            <input
              type="number"
              min="0"
              placeholder="1+"
              value={amrapReps[key] || ''}
              onChange={(e) => onUpdateAmrapReps(day, tier, idx, e.target.value)}
              className="w-12 sm:w-16 px-1 sm:px-2 py-1 border rounded text-center text-sm"
            />
            <span className="text-gray-600 text-xs sm:text-sm whitespace-nowrap">reps</span>
          </div>
        ) : (
          <span className="text-gray-600 w-16 sm:w-20 text-right text-sm sm:text-base">{reps} reps</span>
        )}
        <span className="text-gray-400 text-xs sm:text-sm w-10 sm:w-12 text-right">{Math.round(pct * 100)}%</span>
      </div>
    </div>
  );
};
