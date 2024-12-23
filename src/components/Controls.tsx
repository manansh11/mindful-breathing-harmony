import React from 'react';
import { Button } from '@/components/ui/button';
import { Play, Pause, Settings } from 'lucide-react';

interface ControlsProps {
  isPlaying: boolean;
  onPlayPause: () => void;
  onSettings: () => void;
}

const Controls: React.FC<ControlsProps> = ({ isPlaying, onPlayPause, onSettings }) => {
  return (
    <div className="flex gap-4 mt-8">
      <Button
        onClick={onPlayPause}
        className="w-16 h-16 rounded-full bg-primary hover:bg-primary/90"
      >
        {isPlaying ? <Pause className="h-8 w-8" /> : <Play className="h-8 w-8" />}
      </Button>
      <Button
        onClick={onSettings}
        variant="outline"
        className="w-16 h-16 rounded-full border-2 border-primary"
      >
        <Settings className="h-6 w-6" />
      </Button>
    </div>
  );
};

export default Controls;