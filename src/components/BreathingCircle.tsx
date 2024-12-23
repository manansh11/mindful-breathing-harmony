import React from 'react';

interface BreathingCircleProps {
  isBreathing: boolean;
  phase: 'inhale' | 'hold' | 'exhale';
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ isBreathing, phase }) => {
  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      <div
        className={`absolute w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary
          ${isBreathing ? 'animate-breathe' : ''}`}
      />
      <div className="absolute text-white text-xl font-semibold">
        {phase === 'inhale' && 'Inhale'}
        {phase === 'hold' && 'Hold'}
        {phase === 'exhale' && 'Exhale'}
      </div>
    </div>
  );
};

export default BreathingCircle;