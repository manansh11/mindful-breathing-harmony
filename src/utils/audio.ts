import { useEffect, useRef } from 'react';
import * as Tone from 'tone';

export const useSound = (type: string) => {
  // Create synth instances for different sounds
  const synth = useRef(new Tone.Synth({
    oscillator: {
      type: "sine"
    },
    envelope: {
      attack: 0.1,
      decay: 0.2,
      sustain: 0.5,
      release: 1
    }
  }).toDestination());

  // Set initial volume
  useEffect(() => {
    synth.current.volume.value = -20; // Quieter volume in decibels
    return () => {
      synth.current.dispose();
    };
  }, []);

  const play = () => {
    switch (type) {
      case '/sounds/inhale.mp3':
        // Higher pitch for inhale
        synth.current.triggerAttackRelease("C5", "8n");
        break;
      case '/sounds/hold.mp3':
        // Middle pitch for hold
        synth.current.triggerAttackRelease("G4", "8n");
        break;
      case '/sounds/exhale.mp3':
        // Lower pitch for exhale
        synth.current.triggerAttackRelease("C4", "8n");
        break;
    }
  };

  return play;
};