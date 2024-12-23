import React from 'react';

interface TimerProps {
  minutes: number;
  seconds: number;
}

const Timer: React.FC<TimerProps> = ({ minutes, seconds }) => {
  return (
    <div className="text-4xl font-bold text-primary mt-8">
      {String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
    </div>
  );
};

export default Timer;