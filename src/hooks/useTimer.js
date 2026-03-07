/**
 * HOOK — useTimer
 * Lógica do temporizador Pomodoro isolada do componente.
 */

import { useState, useRef, useCallback, useEffect } from 'react';

const DEFAULT_SECONDS = 25 * 60;

export function useTimer({ onFinish } = {}) {
  const [seconds, setSeconds] = useState(DEFAULT_SECONDS);
  const [running, setRunning] = useState(false);
  const intervalRef = useRef(null);

  const clear = () => clearInterval(intervalRef.current);

  const start = useCallback((durationSeconds) => {
    if (running) return;
    if (durationSeconds !== undefined) setSeconds(durationSeconds);
    setRunning(true);
  }, [running]);

  const pause = useCallback(() => {
    clear();
    setRunning(false);
  }, []);

  const reset = useCallback(() => {
    clear();
    setRunning(false);
    setSeconds(DEFAULT_SECONDS);
  }, []);

  // Tick
  useEffect(() => {
    if (!running) return;
    intervalRef.current = setInterval(() => {
      setSeconds(prev => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          setRunning(false);
          onFinish?.();
          return DEFAULT_SECONDS;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [running, onFinish]);

  const display = `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;

  return { seconds, display, running, start, pause, reset };
}
