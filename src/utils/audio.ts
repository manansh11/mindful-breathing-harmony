import { useEffect, useRef } from 'react';

export const useSound = (url: string) => {
  const audio = useRef(new Audio(url));

  useEffect(() => {
    // Set a lower volume for gentler sounds
    audio.current.volume = 0.3;
    
    return () => {
      audio.current.pause();
    };
  }, []);

  const play = () => {
    audio.current.currentTime = 0;
    audio.current.play();
  };

  return play;
};