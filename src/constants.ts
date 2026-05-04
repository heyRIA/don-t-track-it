import { Exercise, MuscleCategory, Session } from './types';

export const MUSCLE_CATEGORIES: MuscleCategory[] = [
  { id: 'chest', name: 'Chest', lastTrained: '2d ago', isDue: false, icon: 'Dumbbell' },
  { id: 'back', name: 'Back', lastTrained: '4d ago', isDue: false, icon: 'Rows' },
  { id: 'legs', name: 'Legs', lastTrained: 'Due', isDue: true, icon: 'Footprints' },
  { id: 'shoulders', name: 'Shoulders', lastTrained: '1w ago', isDue: false, icon: 'User' },
  { id: 'arms', name: 'Arms', lastTrained: '3d ago', isDue: false, icon: 'Biceps' },
  { id: 'core', name: 'Core', lastTrained: '5d ago', isDue: false, icon: 'Zap' },
];

export const EXERCISES: Exercise[] = [
  { id: 'bench-press', name: 'Bench Press', category: 'chest', personalRecord: { weight: 225, unit: 'lbs', reps: 5 }, lastDone: '2023-10-24' },
  { id: 'incline-press', name: 'Incline Press', category: 'chest', personalRecord: { weight: 185, unit: 'lbs', reps: 6 }, lastDone: '2023-10-21' },
  { id: 'chest-flyes', name: 'Chest Flyes', category: 'chest', personalRecord: { weight: 45, unit: 'lbs', reps: 8 }, lastDone: '2023-10-20' },
  { id: 'push-ups', name: 'Push-ups', category: 'chest', personalRecord: { weight: 50, unit: 'lbs', reps: 1 }, lastDone: '2023-10-25' },
];

export const HISTORY: Session[] = [
  {
    id: 's1',
    exerciseId: 'bench-press',
    date: 'Oct 26, 2023',
    sets: [
      { id: 'set1', weight: 100, reps: 8 },
      { id: 'set2', weight: 100, reps: 8 },
    ],
    notes: '',
    totalVolume: 3150,
  },
  {
    id: 's2',
    exerciseId: 'bench-press',
    date: 'Oct 23, 2023',
    sets: [],
    notes: '',
    totalVolume: 2850,
  },
  {
    id: 's3',
    exerciseId: 'bench-press',
    date: 'Oct 19, 2023',
    sets: [],
    notes: '',
    totalVolume: 2700,
  },
];
