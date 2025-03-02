import React, { useState, useEffect } from "react";
import { QuantumPatternRecognizer } from "@/lib/quantum/QuantumPatternRecognizer";
import { QuantumFeedforwardNN } from "@/lib/quantum/QuantumFeedforwardNN";
import { CosmicWaltz } from "@/lib/quantum/CosmicWaltz";
import { FuzzyLogicEngine } from "@/lib/quantum/FuzzyLogicEngine";

import { Card } from "./ui/card";

interface Agent {
  id: number;
  x: number;
  y: number;
  influence: string;
}

interface SimulationGridProps {
  gridSize?: number;
  agents?: Agent[];
  isRunning?: boolean;
}

const generateRandomAgents = (count: number, gridSize: number): Agent[] => {
  return Array.from({ length: count }, (_, i) => ({
    id: i,
    x: Math.floor(Math.random() * gridSize),
    y: Math.floor(Math.random() * gridSize),
    influence: ["#FF0000", "#00FF00", "#0000FF"][Math.floor(Math.random() * 3)],
  }));
};

const patternRecognizer = new QuantumPatternRecognizer();
const quantumNN = new QuantumFeedforwardNN(4, 64, 10);
const cosmicWaltz = new CosmicWaltz(4, 8);
const fuzzyLogicEngine = new FuzzyLogicEngine(4, 16, 4);

const SimulationGrid = ({
  gridSize = 50,
  agents = generateRandomAgents(10, 50),
  isRunning = true,
}: SimulationGridProps) => {
  const [currentAgents, setCurrentAgents] = useState<Agent[]>(agents);
  const cellSize = Math.min(800 / gridSize, 800 / gridSize);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentAgents((prevAgents) => {
        const newAgents = prevAgents.map((agent) => ({
          ...agent,
          x:
            (agent.x + Math.floor(Math.random() * 3) - 1 + gridSize) % gridSize,
          y:
            (agent.y + Math.floor(Math.random() * 3) - 1 + gridSize) % gridSize,
        }));

        // Analyze patterns using quantum recognition and cosmic waltz
        const pattern = patternRecognizer.recognizePattern(
          newAgents.slice(0, 4).map((a) => a.x / gridSize),
        );

        // Apply cosmic waltz interaction
        const waltzResult = cosmicWaltz.interact(
          newAgents.map((a) => a.x / gridSize),
          newAgents.map((a) => a.y / gridSize),
        );

        // Apply fuzzy logic engine for additional quantum-inspired processing
        const fuzzyInputs = newAgents.slice(0, 4).map((a) => a.x / gridSize);
        const fuzzyMins = Array(fuzzyInputs.length).fill(0);
        const fuzzyMaxes = Array(fuzzyInputs.length).fill(1);
        const fuzzyOutputs = fuzzyLogicEngine.process(
          fuzzyInputs,
          fuzzyMins,
          fuzzyMaxes,
        );

        // Use quantum states to influence agent behavior
        return newAgents.map((agent, i) => ({
          ...agent,
          influence: waltzResult.quantumStates[
            i % waltzResult.quantumStates.length
          ]
            ? `hsla(${((waltzResult.quantumStates[i % waltzResult.quantumStates.length].phase * 180) / Math.PI + 180) % 360}, 
                  ${70 + fuzzyOutputs[i % fuzzyOutputs.length] * 20}%, 
                  ${50 + waltzResult.resonance * 30}%, 
                  ${0.7 + fuzzyOutputs[i % fuzzyOutputs.length] * 0.3})`
            : agent.influence,
        }));
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, gridSize]);

  return (
    <Card className="p-4 bg-background w-full h-full flex items-center justify-center">
      <div
        className="relative border border-border"
        style={{
          width: `${gridSize * cellSize}px`,
          height: `${gridSize * cellSize}px`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
        }}
      >
        {currentAgents.map((agent) => (
          <div
            key={agent.id}
            className="absolute rounded-full transition-all duration-500 ease-in-out"
            style={{
              width: `${cellSize * 0.8}px`,
              height: `${cellSize * 0.8}px`,
              backgroundColor: agent.influence,
              left: `${agent.x * cellSize + cellSize * 0.1}px`,
              top: `${agent.y * cellSize + cellSize * 0.1}px`,
              boxShadow: `0 0 ${cellSize * 0.4}px ${agent.influence}40`,
            }}
          />
        ))}
      </div>
    </Card>
  );
};

export default SimulationGrid;
