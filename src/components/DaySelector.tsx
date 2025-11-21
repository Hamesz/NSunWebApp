import React from 'react';
import type { DayName } from '../types/workout.types';

interface DaySelectorProps {
  days: DayName[];
  currentDay: DayName;
  onDayChange: (day: DayName) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ days, currentDay, onDayChange }) => {
  return (
    <div className="flex gap-1.5 sm:gap-2 mb-3 sm:mb-4 overflow-x-auto pb-2 -mx-1 px-1">
      {days.map(day => (
        <button
          key={day}
          onClick={() => onDayChange(day)}
          className={`px-3 sm:px-4 py-1.5 sm:py-2 rounded-lg font-medium transition-all whitespace-nowrap text-sm sm:text-base flex-shrink-0 ${
            currentDay === day
              ? 'bg-indigo-600 text-white shadow-md'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {day}
        </button>
      ))}
    </div>
  );
};
