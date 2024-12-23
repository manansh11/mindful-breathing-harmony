import React from 'react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { breathingPatterns } from '@/config/breathingPatterns';

interface SettingsProps {
  selectedPatternId: string;
  onPatternChange: (patternId: string) => void;
  bpm: number;
  onBpmChange: (value: number) => void;
}

const Settings: React.FC<SettingsProps> = ({ 
  selectedPatternId, 
  onPatternChange,
  bpm,
  onBpmChange
}) => {
  return (
    <div className="w-full max-w-xs space-y-4">
      <div className="space-y-2">
        <Label htmlFor="pattern">Breathing Pattern</Label>
        <Select value={selectedPatternId} onValueChange={onPatternChange}>
          <SelectTrigger id="pattern">
            <SelectValue placeholder="Select a pattern" />
          </SelectTrigger>
          <SelectContent>
            {breathingPatterns.map((pattern) => (
              <SelectItem key={pattern.id} value={pattern.id}>
                {pattern.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="bpm">Breaths Per Minute (BPM): {bpm}</Label>
        <Slider
          id="bpm"
          min={3}
          max={6}
          step={1}
          value={[bpm]}
          onValueChange={(value) => onBpmChange(value[0])}
          className="w-full"
        />
      </div>
    </div>
  );
};

export default Settings;