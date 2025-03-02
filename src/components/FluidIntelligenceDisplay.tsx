import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  RecursiveIntelligence,
  RecursiveState,
} from "@/lib/fluid/RecursiveIntelligence";
import { HolographicOverlay } from "./HolographicChart";

interface FluidIntelligenceDisplayProps {
  width?: number;
  height?: number;
  refreshInterval?: number;
  animationControls?: {
    speed: number;
    density: number;
    intensity: number;
  };
}

const FluidIntelligenceDisplay = ({
  width = 800,
  height = 400,
  refreshInterval = 3000,
  animationControls = { speed: 1, density: 4, intensity: 0.1 },
}: FluidIntelligenceDisplayProps) => {
  const [intelligence] = useState(() => new RecursiveIntelligence());
  const [state, setState] = useState<RecursiveState>(
    intelligence.getCurrentState(),
  );

  useEffect(() => {
    // Initial evolution
    setState(intelligence.evolve());

    // Set up interval for continuous evolution
    const interval = setInterval(() => {
      setState(intelligence.evolve());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [intelligence, refreshInterval]);

  return (
    <Card className="relative w-full h-full bg-background overflow-hidden">
      <HolographicOverlay
        width={width}
        height={height}
        animationSpeed={animationControls.speed}
        patternDensity={animationControls.density}
        intensity={animationControls.intensity * state.resonanceLevel}
      />

      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>FLUID AI Recursive Intelligence</span>
          <span className="text-sm font-normal">
            Iteration: {state.iteration} | Resonance:{" "}
            {(state.resonanceLevel * 100).toFixed(1)}%
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Symbolic Sequence</h3>
            <div className="p-3 bg-secondary/10 rounded-md font-mono text-sm">
              {state.symbolicSequence}
            </div>

            <h3 className="text-lg font-semibold mt-4">Cognitive State</h3>
            <div className="flex gap-2">
              {state.cognitiveState.map((value, i) => (
                <div
                  key={i}
                  className="h-8 rounded-md"
                  style={{
                    width: "25%",
                    background: `hsla(${(value * 360).toFixed(0)}, 70%, 50%, 0.7)`,
                  }}
                  title={`State ${i + 1}: ${(value * 100).toFixed(1)}%`}
                />
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Active FLUID Tokens</h3>
            <div className="space-y-1 max-h-[120px] overflow-y-auto">
              {state.activeTokens.map((token) => (
                <div
                  key={token.id}
                  className="text-xs p-2 bg-secondary/10 rounded-md flex justify-between"
                >
                  <span className="font-mono">
                    {token.id.substring(0, 10)}...
                  </span>
                  <span>{(token.resonance * 100).toFixed(1)}%</span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-4">Knowledge Graph</h3>
            <div className="text-xs p-2 bg-secondary/10 rounded-md">
              {state.knowledgeNodes.length} nodes with{" "}
              {state.knowledgeNodes.reduce(
                (sum, node) => sum + node.connections.length,
                0,
              )}{" "}
              connections
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default FluidIntelligenceDisplay;
