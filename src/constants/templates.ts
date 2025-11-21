import type { WorkoutTemplate } from '../types/workout.types';

export const TEMPLATES: Record<string, WorkoutTemplate> = {
  T1_STANDARD: {
    sets: [0.75, 0.85, 0.95, 0.90, 0.85, 0.80, 0.75, 0.70, 0.65],
    reps: [5, 3, '1+', 3, 3, 3, 5, 5, '5+']
  },
  T1_VOLUME: {
    sets: [0.65, 0.75, 0.85, 0.85, 0.85, 0.80, 0.75, 0.70, 0.65],
    reps: [8, 6, 4, 4, 4, 5, 6, 7, 8]
  },
  T2_STANDARD: {
    sets: [0.50, 0.60, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70],
    reps: [6, 5, 3, 5, 7, 4, 6, 8]
  },
  T2_ABS: {
    sets: [0.50, 0.60, 0.70, 0.70, 0.70, 0.70, 0.70, 0.70],
    reps: [5, 5, 3, 5, 7, 4, 6, 8]
  },
  T2_PULLUPS: {
    sets: [0.35, 0.45, 0.55, 0.55, 0.55, 0.55, 0.55, 0.55],
    reps: [5, 5, 3, 5, 7, 4, 6, 8]
  }
};
