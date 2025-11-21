import React, { useState, useEffect } from 'react';
import { Calendar } from 'lucide-react';
import { Header } from './components/Header';
import { WorkoutTier } from './components/WorkoutTier';
import { ProgressNotification } from './components/ProgressNotification';
import { TrainingMaxEditor } from './components/TrainingMaxEditor';
import { StorageService } from './services/storage.service';
import { DEFAULT_TRAINING_MAXES } from './constants/exercises';
import { NSUNS_PROGRAM, DAYS } from './constants/program';
import { calculateProgression, getBaseLift } from './utils/workout.utils';
import type {
  DayName,
  TierType,
  TrainingMaxes,
  CompletedSets,
  AmrapReps,
  RecommendedMax
} from './types/workout.types';
import './App.css';

const NSunsApp: React.FC = () => {
  const [trainingMaxes, setTrainingMaxes] = useState<TrainingMaxes>(
    StorageService.load('trainingMaxes', DEFAULT_TRAINING_MAXES)
  );

  const [currentDay, setCurrentDay] = useState<DayName>(
    StorageService.load('currentDay', 'Monday')
  );
  const [completedSets, setCompletedSets] = useState<CompletedSets>(
    StorageService.load('completedSets', {})
  );
  const [amrapReps, setAmrapReps] = useState<AmrapReps>(
    StorageService.load('amrapReps', {})
  );
  const [editingMax, setEditingMax] = useState<string | null>(null);
  const [tempMax, setTempMax] = useState<string>('');
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [recommendedMax, setRecommendedMax] = useState<RecommendedMax | null>(null);

  useEffect(() => {
    StorageService.save('trainingMaxes', trainingMaxes);
  }, [trainingMaxes]);

  useEffect(() => {
    StorageService.save('currentDay', currentDay);
  }, [currentDay]);

  useEffect(() => {
    StorageService.save('completedSets', completedSets);
  }, [completedSets]);

  useEffect(() => {
    StorageService.save('amrapReps', amrapReps);
  }, [amrapReps]);

  const toggleSet = (day: DayName, tier: TierType, setIndex: number): void => {
    const key = `${day}-${tier}-${setIndex}`;
    const newCompleted = { ...completedSets, [key]: !completedSets[key] };
    setCompletedSets(newCompleted);
    checkForMaxUpdate(day, tier, newCompleted);
  };

  const updateAmrapReps = (day: DayName, tier: TierType, setIndex: number, reps: string): void => {
    const key = `${day}-${tier}-${setIndex}`;
    setAmrapReps({ ...amrapReps, [key]: parseInt(reps) || 0 });
  };

  const checkForMaxUpdate = (day: DayName, tier: TierType, completed: CompletedSets): void => {
    const workout = NSUNS_PROGRAM[day][tier];
    const liftName = workout.lift;
    const baseLift = getBaseLift(liftName);

    if (tier === 't1') {
      const allSetsCompleted = workout.sets.every((_, i) => completed[`${day}-${tier}-${i}`]);

      if (allSetsCompleted) {
        const onePlusIndex = workout.reps.findIndex(r => r === '1+');
        if (onePlusIndex === -1) return;

        const key = `${day}-${tier}-${onePlusIndex}`;
        const repsCompleted = amrapReps[key] || 1;

        const increase = calculateProgression(repsCompleted);
        const currentTM = trainingMaxes[baseLift];
        const newTM = currentTM + increase;

        setRecommendedMax({
          lift: baseLift,
          current: currentTM,
          recommended: newTM,
          repsAchieved: repsCompleted,
          increase: increase
        });
        setShowNotification(true);
      }
    }
  };

  const updateTrainingMax = (lift: string, newMax: string): void => {
    setTrainingMaxes({ ...trainingMaxes, [lift]: parseFloat(newMax) });
    setEditingMax(null);
    setShowNotification(false);
  };

  const acceptRecommendedMax = (): void => {
    if (recommendedMax) {
      setTrainingMaxes({ ...trainingMaxes, [recommendedMax.lift]: recommendedMax.recommended });
      setShowNotification(false);
      setRecommendedMax(null);
    }
  };

  const resetDay = (): void => {
    const newCompleted = { ...completedSets };
    const newAmrap = { ...amrapReps };
    Object.keys(newCompleted).forEach(key => {
      if (key.startsWith(currentDay)) {
        delete newCompleted[key];
      }
    });
    Object.keys(newAmrap).forEach(key => {
      if (key.startsWith(currentDay)) {
        delete newAmrap[key];
      }
    });
    setCompletedSets(newCompleted);
    setAmrapReps(newAmrap);
    setShowNotification(false);
  };

  const handleStartEdit = (lift: string, max: number): void => {
    setEditingMax(lift);
    setTempMax(max.toString());
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <Header
          days={DAYS}
          currentDay={currentDay}
          onDayChange={setCurrentDay}
          onResetDay={resetDay}
        />

        {showNotification && recommendedMax && (
          <ProgressNotification
            recommendedMax={recommendedMax}
            onAccept={acceptRecommendedMax}
            onDismiss={() => setShowNotification(false)}
          />
        )}

        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-bold text-gray-800 mb-4">Training Maxes (kg)</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(trainingMaxes).map(([lift, max]) => (
              <TrainingMaxEditor
                key={lift}
                lift={lift}
                max={max}
                isEditing={editingMax === lift}
                tempMax={tempMax}
                onStartEdit={handleStartEdit}
                onSave={updateTrainingMax}
                onTempMaxChange={setTempMax}
              />
            ))}
          </div>
        </div>

        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center gap-2">
            <Calendar size={28} className="text-indigo-600" />
            {currentDay}'s Workout
          </h2>
          <WorkoutTier
            day={currentDay}
            tier="t1"
            workout={NSUNS_PROGRAM[currentDay].t1}
            trainingMaxes={trainingMaxes}
            completedSets={completedSets}
            amrapReps={amrapReps}
            onToggleSet={toggleSet}
            onUpdateAmrapReps={updateAmrapReps}
          />
          <WorkoutTier
            day={currentDay}
            tier="t2"
            workout={NSUNS_PROGRAM[currentDay].t2}
            trainingMaxes={trainingMaxes}
            completedSets={completedSets}
            amrapReps={amrapReps}
            onToggleSet={toggleSet}
            onUpdateAmrapReps={updateAmrapReps}
          />
        </div>

        <div className="mt-6 text-center text-gray-500 text-sm">
          <p>Track your modified nSuns program: Bench Press, OHP, Pull-ups & Abs • Weights in kg</p>
        </div>
      </div>
    </div>
  );
};

export default NSunsApp;
