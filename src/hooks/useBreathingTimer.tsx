import { useState, useEffect } from 'react';

export const useBreathingTimer = (isPlaying: boolean) => {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!isPlaying) {
      setMinutes(0);
      setSeconds(0);
      return;
    }

    let interval: NodeJS.Timeout;
    
    interval = setInterval(() => {
      setSeconds(prev => {
        if (prev === 59) {
          setMinutes(m => m + 1);
          return 0;
        }
        return prev + 1;
      });
    }, 1000);

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  return { minutes, seconds };
};