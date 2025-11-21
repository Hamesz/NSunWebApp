import { EXERCISES } from './exercises';
import { TEMPLATES } from './templates';
import type { WorkoutDay, DayName } from '../types/workout.types';

export const NSUNS_PROGRAM: Record<DayName, WorkoutDay> = {
  Monday: {
    t1: { lift: EXERCISES.BENCH_PRESS, ...TEMPLATES.T1_VOLUME },
    t2: { lift: EXERCISES.OVERHEAD_PRESS, ...TEMPLATES.T2_STANDARD }
  },
  Tuesday: {
    t1: { lift: EXERCISES.PULLUPS, ...TEMPLATES.T1_STANDARD },
    t2: { lift: EXERCISES.ABS, ...TEMPLATES.T2_ABS }
  },
  Wednesday: {
    t1: { lift: EXERCISES.OVERHEAD_PRESS, ...TEMPLATES.T1_STANDARD },
    t2: { lift: EXERCISES.INCLINE_BENCH, ...TEMPLATES.T2_STANDARD }
  },
  Thursday: {
    t1: { lift: EXERCISES.ABS, ...TEMPLATES.T1_STANDARD },
    t2: { lift: EXERCISES.PULLUPS, ...TEMPLATES.T2_PULLUPS }
  },
  Friday: {
    t1: { lift: EXERCISES.BENCH_PRESS, ...TEMPLATES.T1_STANDARD },
    t2: { lift: EXERCISES.CLOSE_GRIP_BENCH, ...TEMPLATES.T2_STANDARD }
  }
};

export const DAYS: DayName[] = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export const WEIGHT_INCREMENT = {
  NONE: 0,
  SMALL: 1.25,
  LARGE: 2.5
} as const;

export const PROGRESSION_THRESHOLDS = {
  SMALL_INCREASE: 3,
  LARGE_INCREASE: 5
} as const;
