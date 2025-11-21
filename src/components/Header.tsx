import React from 'react';
import { Dumbbell } from 'lucide-react';
import { DaySelector } from './DaySelector';
import type { DayName } from '../types/workout.types';

interface HeaderProps {
  days: DayName[];
  currentDay: DayName;
  onDayChange: (day: DayName) => void;
  onResetDay: () => void;
}

export const Header: React.FC<HeaderProps> = ({ days, currentDay, onDayChange, onResetDay }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-4 sm:p-6 mb-4 sm:mb-6">
      <div className="flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
        <Dumbbell size={28} className="text-indigo-600 sm:w-8 sm:h-8" />
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-800">nSuns Workout Tracker</h1>
      </div>
      <DaySelector days={days} currentDay={currentDay} onDayChange={onDayChange} />
      <button
        onClick={onResetDay}
        className="w-full py-2 sm:py-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors font-medium text-sm sm:text-base mt-3"
      >
        Reset Today's Workout
      </button>
    </div>
  );
};
