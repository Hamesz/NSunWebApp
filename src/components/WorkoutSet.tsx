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
    <div className="flex items-center justify-between p-2 bg-gray-50 rounded hover:bg-gray-100 transition-colors">
      <div className="flex items-center gap-3 flex-1">
        <button
          onClick={() => onToggleSet(day, tier, idx)}
          className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${
            isCompleted ? 'bg-green-500 text-white' : 'bg-gray-200 text-gray-400'
          }`}
        >
          {isCompleted ? <Check size={18} /> : <X size={18} />}
        </button>
        <span className="text-gray-700 font-medium">Set {idx + 1}</span>
      </div>
      <div className="flex items-center gap-4">
        <span className="text-gray-600">{weight} kg</span>
        {isOnePlusAmrap ? (
          <div className="flex items-center gap-2">
            <input
              type="number"
              min="0"
              placeholder="1+"
              value={amrapReps[key] || ''}
              onChange={(e) => onUpdateAmrapReps(day, tier, idx, e.target.value)}
              className="w-16 px-2 py-1 border rounded text-center"
            />
            <span className="text-gray-600 text-sm">reps</span>
          </div>
        ) : (
          <span className="text-gray-600 w-20 text-right">{reps} reps</span>
        )}
        <span className="text-gray-400 text-sm w-12 text-right">{Math.round(pct * 100)}%</span>
      </div>
    </div>
  );
};
