export interface WorkoutTemplate {
  sets: number[];
  reps: (number | string)[];
}

export interface WorkoutDay {
  t1: WorkoutSet;
  t2: WorkoutSet;
}

export interface WorkoutSet extends WorkoutTemplate {
  lift: string;
}

export interface TrainingMaxes {
  [key: string]: number;
}

export interface CompletedSets {
  [key: string]: boolean;
}

export interface AmrapReps {
  [key: string]: number;
}

export interface RecommendedMax {
  lift: string;
  current: number;
  recommended: number;
  repsAchieved: number;
  increase: number;
}

export type DayName = 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday';
export type TierType = 't1' | 't2';
