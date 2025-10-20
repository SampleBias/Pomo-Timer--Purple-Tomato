import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { useTimerStore, useTimerActions, TimerMode } from '@/hooks/useTimerStore';
import { WORK_DURATION, SHORT_BREAK_DURATION, LONG_BREAK_DURATION } from '@/lib/constants';
import { CircularProgress } from '@/components/CircularProgress';
import { TimerControls } from '@/components/TimerControls';
import { SessionTracker } from '@/components/SessionTracker';
import { Badge } from '@/components/ui/badge';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import { TomatoIcon } from '@/components/TomatoIcon';
const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};
const getModeLabel = (mode: TimerMode): string => {
  switch (mode) {
    case 'work': return 'FOCUS';
    case 'shortBreak': return 'SHORT BREAK';
    case 'longBreak': return 'LONG BREAK';
  }
};
const getTotalDuration = (mode: TimerMode): number => {
  switch (mode) {
    case 'work': return WORK_DURATION;
    case 'shortBreak': return SHORT_BREAK_DURATION;
    case 'longBreak': return LONG_BREAK_DURATION;
  }
};
export function HomePage() {
  const mode = useTimerStore((state) => state.mode);
  const timeRemaining = useTimerStore((state) => state.timeRemaining);
  const isRunning = useTimerStore((state) => state.isRunning);
  const { tick } = useTimerActions();
  const [notificationPermission, setNotificationPermission] = useState('default');
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const isInitialMount = useRef(true);
  const permissionsRequested = useRef(false);
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setNotificationPermission(Notification.permission);
    }
  }, []);
  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;
    if (isRunning) {
      timer = setInterval(tick, 1000);
    }
    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning, tick]);
  useEffect(() => {
    if (isInitialMount.current) {
      isInitialMount.current = false;
      return;
    }
    const message = `Time for your ${getModeLabel(mode).toLowerCase()}!`;
    toast.info(message);
    if (notificationPermission === 'granted') {
      new Notification('Zenith Timer', { body: message, silent: true });
    }
    audioRef.current?.play().catch(e => console.error("Audio playback failed:", e));
  }, [mode, notificationPermission]);
  const requestPermissions = () => {
    if (permissionsRequested.current) return;
    permissionsRequested.current = true;
    // Request notification permission
    if (notificationPermission === 'default') {
      Notification.requestPermission().then(setNotificationPermission);
    }
    // Initialize and unlock audio context on first user interaction
    if (!audioRef.current) {
      try {
        audioRef.current = new Audio('/notification.mp3');
        audioRef.current.volume = 0.5;
        // Play and immediately pause to prepare the audio element.
        audioRef.current.play().then(() => {
          audioRef.current?.pause();
        }).catch(() => {
          console.warn("Audio context could not be unlocked automatically.");
        });
      } catch (error) {
        console.error("Failed to initialize audio:", error);
      }
    }
  };
  const progress = 1 - timeRemaining / getTotalDuration(mode);
  const badgeClassName = mode === 'work' ? 'badge-primary' : 'badge-secondary';
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-4 bg-background bg-futuristic-gradient transition-colors duration-500">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        className="w-full max-w-md bg-card/60 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-8 space-y-6 border"
      >
        <div className="flex justify-center">
          <Badge className={`${badgeClassName} text-sm font-bold tracking-widest px-4 py-1 shadow-md`}>
            {getModeLabel(mode)}
          </Badge>
        </div>
        <div className="relative flex items-center justify-center">
          <CircularProgress progress={progress} />
          <div className="absolute font-display text-6xl md:text-7xl font-bold text-foreground">
            {formatTime(timeRemaining)}
          </div>
        </div>
        <motion.div
          className="flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.4, ease: 'easeOut' }}
        >
          <TomatoIcon isFilled className="w-16 h-16 text-accent-primary/80 fill-accent-primary/10" />
        </motion.div>
        <TimerControls onStart={requestPermissions} />
        <SessionTracker />
      </motion.div>
      <footer className="absolute bottom-4 text-center text-muted-foreground/80 text-sm">
        <p>Built with ❤️ by hc-bld-dev on Cloudflare</p>
      </footer>
      <Toaster richColors closeButton />
    </main>
  );
}