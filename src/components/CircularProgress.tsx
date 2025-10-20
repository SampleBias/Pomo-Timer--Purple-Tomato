import { motion } from 'framer-motion';
import { useTimerStore } from '@/hooks/useTimerStore';
interface CircularProgressProps {
  progress: number; // 0 to 1
}
const STROKE_WIDTH = 8;
const RADIUS = 100;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;
export function CircularProgress({ progress }: CircularProgressProps) {
  const mode = useTimerStore((state) => state.mode);
  const strokeDashoffset = CIRCUMFERENCE * (1 - progress);
  const colorClass = mode === 'work' ? 'stroke-accent-primary' : 'stroke-accent-secondary';
  return (
    <div className="relative h-60 w-60">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="-rotate-90"
      >
        {/* Background Circle */}
        <circle
          cx="120"
          cy="120"
          r={RADIUS}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          className="stroke-muted/50"
        />
        {/* Progress Circle */}
        <motion.circle
          cx="120"
          cy="120"
          r={RADIUS}
          fill="transparent"
          strokeWidth={STROKE_WIDTH}
          strokeLinecap="round"
          className={colorClass}
          strokeDasharray={CIRCUMFERENCE}
          initial={{ strokeDashoffset: CIRCUMFERENCE }}
          animate={{ strokeDashoffset }}
          transition={{ duration: 0.5, ease: 'linear' }}
        />
      </svg>
    </div>
  );
}