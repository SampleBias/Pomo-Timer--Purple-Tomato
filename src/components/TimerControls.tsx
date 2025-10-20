import { Play, Pause, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTimerStore, useTimerActions } from '@/hooks/useTimerStore';
import { motion } from 'framer-motion';
interface TimerControlsProps {
  onStart: () => void;
}
export function TimerControls({ onStart }: TimerControlsProps) {
  const isRunning = useTimerStore((state) => state.isRunning);
  const { startTimer, pauseTimer, resetTimer } = useTimerActions();
  const handlePrimaryClick = () => {
    if (isRunning) {
      pauseTimer();
    } else {
      onStart(); // This will handle permissions before starting
      startTimer();
    }
  };
  return (
    <div className="flex items-center justify-center gap-4">
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={handlePrimaryClick}
          size="lg"
          className="w-36 h-14 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-accent-primary to-purple-500 text-accent-primary-foreground hover:from-accent-primary/90 hover:to-purple-500/90"
        >
          {isRunning ? <Pause className="mr-2 h-5 w-5" /> : <Play className="mr-2 h-5 w-5" />}
          {isRunning ? 'Pause' : 'Start'}
        </Button>
      </motion.div>
      <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
        <Button
          onClick={resetTimer}
          variant="outline"
          size="icon"
          className="h-14 w-14 shadow-lg hover:shadow-xl transition-shadow"
          aria-label="Reset Timer"
        >
          <RotateCcw className="h-6 w-6" />
        </Button>
      </motion.div>
    </div>
  );
}