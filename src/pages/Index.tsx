import React, { useState, useEffect } from 'react';
import BreathingCircle from '@/components/BreathingCircle';
import Controls from '@/components/Controls';
import Timer from '@/components/Timer';
import Settings from '@/components/Settings';
import { breathingPatterns, type BreathingPattern } from '@/config/breathingPatterns';
import { useToast } from '@/components/ui/use-toast';
import { useSound } from '@/utils/audio';

const Index = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPatternId, setSelectedPatternId] = useState(breathingPatterns[0].id);
  const [currentPattern, setCurrentPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [showSettings, setShowSettings] = useState(false);
  const [bpm, setBpm] = useState(4);

  // Sound effects
  const playInhale = useSound('/sounds/inhale.mp3');
  const playHold = useSound('/sounds/hold.mp3');
  const playExhale = useSound('/sounds/exhale.mp3');

  // Update current pattern when selection changes
  useEffect(() => {
    const pattern = breathingPatterns.find(p => p.id === selectedPatternId);
    if (pattern) {
      setCurrentPattern(pattern);
      setStepIndex(0);
      toast({
        title: "Pattern Changed",
        description: `Now using ${pattern.name}`,
      });
    }
  }, [selectedPatternId, toast]);

  // Handle breathing cycle with BPM adjustment
  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      const currentStep = currentPattern.steps[stepIndex];
      const bpmAdjustment = 4 / bpm; // Scale durations based on BPM
      const duration = currentStep.duration * bpmAdjustment * 1000;

      // Play sound based on phase
      switch (currentStep.phase) {
        case 'inhale':
          playInhale();
          break;
        case 'hold':
          playHold();
          break;
        case 'exhale':
          playExhale();
          break;
      }

      timer = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % currentPattern.steps.length);
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, stepIndex, currentPattern, bpm, playInhale, playHold, playExhale]);

  // Handle timer
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

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const handleSettings = () => {
    setShowSettings(!showSettings);
  };

  const handlePatternChange = (patternId: string) => {
    setSelectedPatternId(patternId);
  };

  const handleBpmChange = (value: number) => {
    setBpm(value);
    toast({
      title: "BPM Updated",
      description: `Breathing rate set to ${value} breaths per minute`,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-accent to-white flex flex-col items-center justify-center p-4">
      <h1 className="text-3xl font-bold text-primary mb-8">Breathwork</h1>
      
      <BreathingCircle 
        isBreathing={isPlaying} 
        phase={currentPattern.steps[stepIndex].phase} 
      />
      
      <Timer minutes={minutes} seconds={seconds} />
      
      {showSettings && (
        <div className="mt-8">
          <Settings
            selectedPatternId={selectedPatternId}
            onPatternChange={handlePatternChange}
            bpm={bpm}
            onBpmChange={handleBpmChange}
          />
        </div>
      )}
      
      <Controls
        isPlaying={isPlaying}
        onPlayPause={handlePlayPause}
        onSettings={handleSettings}
      />
    </div>
  );
};

export default Index;