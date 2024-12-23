import { useState, useEffect } from 'react';
import { useToast } from '@/components/ui/use-toast';
import { breathingPatterns, type BreathingPattern } from '@/config/breathingPatterns';
import { useSound } from '@/utils/audio';

export const useBreathing = () => {
  const { toast } = useToast();
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPatternId, setSelectedPatternId] = useState(breathingPatterns[0].id);
  const [currentPattern, setCurrentPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [stepIndex, setStepIndex] = useState(0);
  const [bpm, setBpm] = useState(4);

  const playInhale = useSound('/sounds/inhale.mp3');
  const playHold = useSound('/sounds/hold.mp3');
  const playExhale = useSound('/sounds/exhale.mp3');

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

  useEffect(() => {
    let timer: NodeJS.Timeout;
    
    if (isPlaying) {
      const currentStep = currentPattern.steps[stepIndex];
      const bpmAdjustment = 4 / bpm;
      const duration = currentStep.duration * bpmAdjustment * 1000;

      const playSound = () => {
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
      };

      playSound();

      timer = setTimeout(() => {
        setStepIndex((prev) => (prev + 1) % currentPattern.steps.length);
      }, duration);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isPlaying, stepIndex, currentPattern, bpm, playInhale, playHold, playExhale]);

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    if (!isPlaying) {
      setStepIndex(0);
    }
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

  const handleReset = () => {
    setIsPlaying(false);
    setStepIndex(0);
    toast({
      title: "Exercise Reset",
      description: "Timer and breathing cycle have been reset",
    });
  };

  return {
    isPlaying,
    currentPattern,
    stepIndex,
    bpm,
    selectedPatternId,
    handlePlayPause,
    handlePatternChange,
    handleBpmChange,
    handleReset
  };
};