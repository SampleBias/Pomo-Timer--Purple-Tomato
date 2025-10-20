import { create } from 'zustand';
import {
  WORK_DURATION,
  SHORT_BREAK_DURATION,
  LONG_BREAK_DURATION,
  SESSIONS_PER_CYCLE,
} from '@/lib/constants';
export type TimerMode = 'work' | 'shortBreak' | 'longBreak';
interface TimerState {
  mode: TimerMode;
  timeRemaining: number;
  sessionsCompleted: number;
  isRunning: boolean;
  actions: {
    startTimer: () => void;
    pauseTimer: () => void;
    resetTimer: () => void;
    tick: () => void;
    _setMode: (mode: TimerMode) => void;
  };
}
const getDuration = (mode: TimerMode): number => {
  switch (mode) {
    case 'work':
      return WORK_DURATION;
    case 'shortBreak':
      return SHORT_BREAK_DURATION;
    case 'longBreak':
      return LONG_BREAK_DURATION;
    default:
      return WORK_DURATION;
  }
};
export const useTimerStore = create<TimerState>((set, get) => ({
  mode: 'work',
  timeRemaining: WORK_DURATION,
  sessionsCompleted: 0,
  isRunning: false,
  actions: {
    startTimer: () => set({ isRunning: true }),
    pauseTimer: () => set({ isRunning: false }),
    resetTimer: () => {
      set({
        isRunning: false,
        mode: 'work',
        timeRemaining: WORK_DURATION,
        sessionsCompleted: 0,
      });
    },
    _setMode: (newMode: TimerMode) => {
      set({
        mode: newMode,
        isRunning: false, // Always start paused
        timeRemaining: getDuration(newMode),
      });
    },
    tick: () => {
      const { timeRemaining, isRunning, mode, sessionsCompleted } = get();
      if (!isRunning) return;
      if (timeRemaining > 1) {
        set({ timeRemaining: timeRemaining - 1 });
        return;
      }
      // Timer is finishing on this tick
      let nextMode: TimerMode = 'work';
      let newSessionsCompleted = sessionsCompleted;
      if (mode === 'work') {
        newSessionsCompleted++;
        if (newSessionsCompleted % SESSIONS_PER_CYCLE === 0) {
          nextMode = 'longBreak';
        } else {
          nextMode = 'shortBreak';
        }
      } else { // shortBreak or longBreak finished
        nextMode = 'work';
        if (mode === 'longBreak') {
          newSessionsCompleted = 0; // Reset cycle
        }
      }
      set({
        isRunning: false, // Stop the timer
        timeRemaining: getDuration(nextMode), // Immediately set time for the next session
        mode: nextMode,
        sessionsCompleted: newSessionsCompleted,
      });
    },
  },
}));
export const useTimerActions = () => useTimerStore((state) => state.actions);