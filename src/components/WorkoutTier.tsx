import React from 'react';
import { WorkoutSet } from './WorkoutSet';
import type { TierType, DayName, WorkoutSet as WorkoutSetType, AmrapReps, CompletedSets } from '../types/workout.types';
import { getBaseLift } from '../utils/workout.utils';

interface WorkoutTierProps {
  day: DayName;
  tier: TierType;
  workout: WorkoutSetType;
  trainingMaxes: Record<string, number>;
  completedSets: CompletedSets;
  amrapReps: AmrapReps;
  onToggleSet: (day: DayName, tier: TierType, setIndex: number) => void;
  onUpdateAmrapReps: (day: DayName, tier: TierType, setIndex: number, reps: string) => void;
}

export const WorkoutTier: React.FC<WorkoutTierProps> = ({
  day,
  tier,
  workout,
  trainingMaxes,
  completedSets,
  amrapReps,
  onToggleSet,
  onUpdateAmrapReps
}) => {
  const liftName = workout.lift;
  const baseLift = getBaseLift(liftName);
  const tm = trainingMaxes[baseLift] || 0;
  const tierLabel = tier === 't1' ? 'Main Lift' : 'Secondary Lift';

  return (
    <div className="bg-white rounded-lg shadow-md p-3 sm:p-4 mb-3 sm:mb-4">
      <div className="flex justify-between items-center mb-2 sm:mb-3 gap-2">
        <h3 className="text-base sm:text-lg font-bold text-gray-800">{tierLabel}: {liftName}</h3>
        <span className="text-xs sm:text-sm text-gray-600 whitespace-nowrap">TM: {tm} kg</span>
      </div>
      <div className="space-y-1.5 sm:space-y-2">
        {workout.sets.map((pct, idx) => (
          <WorkoutSet
            key={idx}
            day={day}
            tier={tier}
            pct={pct}
            reps={workout.reps[idx]}
            idx={idx}
            tm={tm}
            completedSets={completedSets}
            amrapReps={amrapReps}
            onToggleSet={onToggleSet}
            onUpdateAmrapReps={onUpdateAmrapReps}
          />
        ))}
      </div>
    </div>
  );
};
