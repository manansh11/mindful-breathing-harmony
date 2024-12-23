export interface BreathingStep {
  phase: 'inhale' | 'hold' | 'exhale';
  duration: number;
}

export interface BreathingPattern {
  id: string;
  name: string;
  steps: BreathingStep[];
}

export const breathingPatterns: BreathingPattern[] = [
  {
    id: '4-7-8',
    name: '4-7-8 Breathing',
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 7 },
      { phase: 'exhale', duration: 8 },
    ],
  },
  {
    id: 'box',
    name: 'Box Breathing',
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'hold', duration: 4 },
      { phase: 'exhale', duration: 4 },
      { phase: 'hold', duration: 4 },
    ],
  },
  {
    id: 'simple',
    name: 'Simple Breath',
    steps: [
      { phase: 'inhale', duration: 4 },
      { phase: 'exhale', duration: 4 },
    ],
  },
];