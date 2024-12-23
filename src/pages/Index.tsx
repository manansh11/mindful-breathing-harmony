import React, { useState } from 'react';
import BreathingCircle from '@/components/BreathingCircle';
import Controls from '@/components/Controls';
import Timer from '@/components/Timer';
import Settings from '@/components/Settings';
import { useBreathing } from '@/hooks/useBreathing';
import { useBreathingTimer } from '@/hooks/useBreathingTimer';

const Index = () => {
  const [showSettings, setShowSettings] = useState(false);
  
  const {
    isPlaying,
    currentPattern,
    stepIndex,
    bpm,
    selectedPatternId,
    handlePlayPause,
    handlePatternChange,
    handleBpmChange,
    handleReset
  } = useBreathing();

  const { minutes, seconds } = useBreathingTimer(isPlaying);

  const handleSettings = () => {
    setShowSettings(!showSettings);
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
        onReset={handleReset}
      />
    </div>
  );
};

export default Index;