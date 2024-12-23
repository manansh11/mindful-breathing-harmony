import React from 'react';

interface BreathingCircleProps {
  isBreathing: boolean;
  phase: 'inhale' | 'hold' | 'exhale';
}

const BreathingCircle: React.FC<BreathingCircleProps> = ({ isBreathing, phase }) => {
  const getAnimationClass = () => {
    if (!isBreathing) return '';
    switch (phase) {
      case 'inhale':
        return 'animate-[scale-in_4s_ease-in-out_infinite]';
      case 'hold':
        return 'scale-100';
      case 'exhale':
        return 'animate-[scale-out_4s_ease-in-out_infinite]';
      default:
        return '';
    }
  };

  return (
    <div className="relative flex items-center justify-center w-64 h-64">
      <div
        className={`absolute w-48 h-48 rounded-full bg-gradient-to-br from-primary to-secondary transition-transform ${getAnimationClass()}`}
      />
      <div className="absolute text-white text-xl font-semibold">
        {phase.charAt(0).toUpperCase() + phase.slice(1)}
      </div>
    </div>
  );
};

export default BreathingCircle;