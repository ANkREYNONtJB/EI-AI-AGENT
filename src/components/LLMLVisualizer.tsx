import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { LLMLTrainer, LLMLSequence } from "@/lib/llml/LLMLTrainer";
import { HolographicOverlay } from "./HolographicChart";

interface LLMLVisualizerProps {
  width?: number;
  height?: number;
  animationControls?: {
    speed: number;
    density: number;
    intensity: number;
  };
}

const LLMLVisualizer = ({
  width = 800,
  height = 400,
  animationControls = { speed: 1, density: 4, intensity: 0.1 },
}: LLMLVisualizerProps) => {
  const [trainer] = useState(() => new LLMLTrainer());
  const [currentSequence, setCurrentSequence] = useState<LLMLSequence | null>(
    null,
  );
  const [resonanceLevel, setResonanceLevel] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      const challenge = trainer.generateChallenge();
      const trained = trainer.trainOnSequence(challenge);
      setCurrentSequence(trained);
      setResonanceLevel(trainer.evaluateSequence(trained));
    }, 5000);

    return () => clearInterval(interval);
  }, [trainer]);

  return (
    <Card className="relative w-full h-full bg-background overflow-hidden">
      <HolographicOverlay
        width={width}
        height={height}
        animationSpeed={animationControls.speed}
        patternDensity={animationControls.density}
        intensity={animationControls.intensity}
      />

      <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center space-y-4">
        {currentSequence && (
          <>
            <div className="text-2xl font-bold font-mono">
              {currentSequence.input}
            </div>
            <div className="text-lg text-muted-foreground">
              {currentSequence.output}
            </div>
            <div className="text-sm">
              Resonance Level: {(resonanceLevel * 100).toFixed(1)}%
            </div>
          </>
        )}
      </div>
    </Card>
  );
};

export default LLMLVisualizer;
