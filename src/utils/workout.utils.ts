import { EXERCISE_TO_BASE_LIFT } from '../constants/exercises';
import { PROGRESSION_THRESHOLDS, WEIGHT_INCREMENT } from '../constants/program';

export const calculateWeight = (tm: number, percentage: number): number => {
  return Math.round((tm * percentage) / 2.5) * 2.5;
};

export const getBaseLift = (exerciseName: string): string => {
  return EXERCISE_TO_BASE_LIFT[exerciseName] || exerciseName;
};

export const calculateProgression = (reps: number): number => {
  if (reps >= PROGRESSION_THRESHOLDS.LARGE_INCREASE) {
    return WEIGHT_INCREMENT.LARGE;
  } else if (reps >= PROGRESSION_THRESHOLDS.SMALL_INCREASE) {
    return WEIGHT_INCREMENT.SMALL;
  }
  return WEIGHT_INCREMENT.NONE;
};
