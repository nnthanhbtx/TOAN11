import React, { useEffect, useState } from 'react';
import { Clock, Pause, Play } from 'lucide-react';

interface TimerProps {
  initialMinutes: number;
  initialElapsedSeconds?: number;
  isRunning: boolean;
  onTimeUp: () => void;
  resetKey?: string | number;
  onElapsedChange?: (elapsedSeconds: number) => void;
  compact?: boolean;
}

export const Timer: React.FC<TimerProps> = React.memo(({
  initialMinutes,
  initialElapsedSeconds = 0,
  isRunning,
  onTimeUp,
  resetKey,
  onElapsedChange,
  compact = false,
}) => {
  const totalInitialSeconds = initialMinutes * 60;
  const [secondsLeft, setSecondsLeft] = useState(() =>
    Math.max(0, totalInitialSeconds - initialElapsedSeconds)
  );
  const [isPaused, setIsPaused] = useState(false);

  // Reset when initialMinutes or resetKey changes
  useEffect(() => {
    const startLeft = Math.max(0, initialMinutes * 60 - initialElapsedSeconds);
    setSecondsLeft(startLeft);
    setIsPaused(false);
    if (onElapsedChange) {
      onElapsedChange(initialElapsedSeconds);
    }
  }, [initialMinutes, resetKey]);

  useEffect(() => {
    if (!isRunning || isPaused) return;

    if (secondsLeft <= 0) {
      onTimeUp();
      return;
    }

    const interval = setInterval(() => {
      setSecondsLeft((prev) => {
        const next = prev <= 1 ? 0 : prev - 1;
        if (onElapsedChange) {
          onElapsedChange(totalInitialSeconds - next);
        }
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp();
          return 0;
        }
        return next;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isRunning, isPaused, secondsLeft, onTimeUp, totalInitialSeconds, onElapsedChange]);

  const minutes = Math.floor(secondsLeft / 60);
  const seconds = secondsLeft % 60;
  const isLowTime = secondsLeft <= 300 && secondsLeft > 0; // <= 5 phút

  const formatDigits = (n: number) => (n < 10 ? `0${n}` : `${n}`);

  if (compact) {
    return (
      <div
        className={`flex items-center gap-1.5 px-2.5 py-2 rounded-xl border font-mono text-xs font-bold shrink-0 ${
          isLowTime
            ? 'bg-rose-950/90 border-rose-500 text-rose-200 animate-pulse'
            : 'bg-sky-950/80 border-sky-800/70 text-cyan-300'
        }`}
      >
        <Clock className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
        <span className="tabular-nums">
          {formatDigits(minutes)}:{formatDigits(seconds)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={`inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-xs sm:text-sm font-semibold tracking-wide shadow-md ${
        isLowTime
          ? 'bg-rose-950/80 border-rose-500 text-rose-200 animate-pulse'
          : isRunning
          ? 'bg-[#0b1739] border-amber-500/40 text-amber-300'
          : 'bg-[#0b1739] border-sky-800/80 text-sky-200'
      }`}
    >
      <Clock
        className={`w-4 h-4 ${
          !isRunning ? 'text-sky-400' : isLowTime ? 'text-rose-400' : 'text-amber-400'
        }`}
      />
      <span className="font-mono text-base tabular-nums font-black text-white">
        {formatDigits(minutes)}:{formatDigits(seconds)}
      </span>
      {isRunning && isLowTime && (
        <span className="hidden sm:inline text-xs font-bold text-rose-300">
          (Sắp hết giờ!)
        </span>
      )}
      {isRunning && (
        <button
          onClick={() => setIsPaused(!isPaused)}
          className="ml-0.5 p-1 rounded-lg bg-[#071126] hover:bg-sky-900 text-sky-300 hover:text-white border border-sky-800/70 transition-colors"
          title={isPaused ? 'Tiếp tục tính giờ' : 'Tạm dừng đồng hồ'}
          type="button"
        >
          {isPaused ? (
            <Play className="w-3.5 h-3.5 text-emerald-400 fill-current" />
          ) : (
            <Pause className="w-3.5 h-3.5 text-amber-300" />
          )}
        </button>
      )}
    </div>
  );
});
