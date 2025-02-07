import React, { useState, useEffect } from "react";
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
      setCurrentAgents((prevAgents) =>
        prevAgents.map((agent) => ({
          ...agent,
          x:
            (agent.x + Math.floor(Math.random() * 3) - 1 + gridSize) % gridSize,
          y:
            (agent.y + Math.floor(Math.random() * 3) - 1 + gridSize) % gridSize,
        })),
      );
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
