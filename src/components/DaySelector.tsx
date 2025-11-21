import React from 'react';
import type { DayName } from '../types/workout.types';

interface DaySelectorProps {
  days: DayName[];
  currentDay: DayName;
  onDayChange: (day: DayName) => void;
}

export const DaySelector: React.FC<DaySelectorProps> = ({ days, currentDay, onDayChange }) => {
  return (
    <div className="flex gap-2 mb-4 overflow-x-auto">
      {days.map(day => (
        <button
          key={day}
          onClick={() => onDayChange(day)}
          className={`px-4 py-2 rounded-lg font-medium transition-all whitespace-nowrap ${
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
