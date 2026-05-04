export type Screen = 'home' | 'muscles' | 'log' | 'history' | 'profile' | 'category-detail' | 'exercise-log';

export interface SetEntry {
  id: string;
  weight: number;
  reps: number;
}

export interface Exercise {
  id: string;
  name: string;
  category: string;
  personalRecord: {
    weight: number;
    unit: 'lbs' | 'kg';
    reps: number;
  };
  lastDone?: string; // date string
}

export interface Session {
  id: string;
  exerciseId: string;
  date: string;
  sets: SetEntry[];
  notes: string;
  totalVolume: number;
}

export interface MuscleCategory {
  id: string;
  name: string;
  lastTrained: string; // e.g., "2d ago"
  isDue: boolean;
  icon: string;
}

export interface AppState {
  currentScreen: Screen;
  selectedCategoryId?: string;
  selectedExerciseId?: string;
}
