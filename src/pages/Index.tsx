import React, { useState, useEffect } from 'react';
import BreathingCircle from '@/components/BreathingCircle';
import Controls from '@/components/Controls';
import Timer from '@/components/Timer';

const Index = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [phase, setPhase] = useState<'inhale' | 'hold' | 'exhale'>('inhale');
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isPlaying) {
      interval = setInterval(() => {
        setSeconds(prev => {
          if (prev === 59) {
            setMinutes(m => m + 1);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isPlaying]);

  useEffect(() => {
    let phaseInterval: NodeJS.Timeout;
    
    if (isPlaying) {
      phaseInterval = setInterval(() => {
        setPhase(prev => {
          if (prev === 'inhale') return 'hold';
          if (prev === 'hold') return 'exhale';
          return 'inhale';
        });
      }, 4000); // Change phase every 4 seconds
    }

    return () => {
      if (phaseInterval) clearInterval(phaseInterval);
    };
  }, [isPlaying]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSettings = () => {
    console.log('Settings clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Breathwork</h1>
      
      <BreathingCircle isBreathing={isPlaying} phase={phase} />
      
      <Timer minutes={minutes} seconds={seconds} />
      
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSettings={handleSettings}
      />
    </div>
  );
};

export default Index;