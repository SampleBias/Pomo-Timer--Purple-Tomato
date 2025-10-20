import { useTimerStore } from '@/hooks/useTimerStore';
import { TomatoIcon } from '@/components/TomatoIcon';
import { SESSIONS_PER_CYCLE } from '@/lib/constants';
export function SessionTracker() {
  const sessionsCompleted = useTimerStore((state) => state.sessionsCompleted);
  return (
    <div className="flex items-center justify-center gap-3 h-6">
      {Array.from({ length: SESSIONS_PER_CYCLE }).map((_, index) => (
        <TomatoIcon
          key={index}
          isFilled={index < sessionsCompleted}
          className="w-5 h-5"
        />
      ))}
    </div>
  );
}