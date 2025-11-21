import React from 'react';
import { Edit2, Save } from 'lucide-react';

interface TrainingMaxEditorProps {
  lift: string;
  max: number;
  isEditing: boolean;
  tempMax: string;
  onStartEdit: (lift: string, max: number) => void;
  onSave: (lift: string, newMax: string) => void;
  onTempMaxChange: (value: string) => void;
}

export const TrainingMaxEditor: React.FC<TrainingMaxEditorProps> = ({
  lift,
  max,
  isEditing,
  tempMax,
  onStartEdit,
  onSave,
  onTempMaxChange
}) => {
  return (
    <div className="bg-gray-50 p-2.5 sm:p-3 rounded-lg">
      <div className="flex items-center justify-between gap-2">
        <span className="font-medium text-gray-700 text-xs sm:text-sm truncate">{lift}</span>
        {isEditing ? (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <input
              type="number"
              step="2.5"
              value={tempMax}
              onChange={(e) => onTempMaxChange(e.target.value)}
              className="w-16 sm:w-20 px-1.5 sm:px-2 py-1 border rounded text-sm"
              autoFocus
            />
            <button
              onClick={() => onSave(lift, tempMax)}
              className="text-green-600 hover:text-green-700 p-1"
            >
              <Save size={16} className="sm:w-[18px] sm:h-[18px]" />
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="text-indigo-600 font-bold text-sm sm:text-base whitespace-nowrap">{max} kg</span>
            <button
              onClick={() => onStartEdit(lift, max)}
              className="text-gray-400 hover:text-gray-600 p-1"
            >
              <Edit2 size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
