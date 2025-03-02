import React, { useState, useEffect, useRef } from "react";
import { QuantumPatternRecognizer } from "@/lib/quantum/QuantumPatternRecognizer";
import { QuantumFeedforwardNN } from "@/lib/quantum/QuantumFeedforwardNN";
import { CosmicWaltz } from "@/lib/quantum/CosmicWaltz";
import { FuzzyLogicEngine } from "@/lib/quantum/FuzzyLogicEngine";
import { LLMLInterpreter } from "@/lib/llml/LLMLInterpreter";

import { Card } from "./ui/card";

interface Agent {
  id: number;
  x: number;
  y: number;
  influence: string;
  size?: number;
  type?: "COSMIC" | "QUANTUM" | "SYMBOLIC" | "STANDARD";
  symbolicSequence?: string;
  resonance?: number;
}

interface SimulationGridProps {
  gridSize?: number;
  agents?: Agent[];
  isRunning?: boolean;
}

const generateRandomAgents = (count: number, gridSize: number): Agent[] => {
  // Create special cosmic agents
  const agents: Agent[] = [
    // Cosmic consciousness agent (Egyptian figure)
    {
      id: 0,
      x: Math.floor(gridSize * 0.3),
      y: Math.floor(gridSize * 0.5),
      influence: `hsla(45, 100%, 60%, 0.9)`,
      size: 2.5,
      type: "COSMIC",
      symbolicSequence: "Ψ(Σ(HΩ)↔∫(λΔ))",
      resonance: 0.95,
    },
    // Quantum observer agent (Hooded figure)
    {
      id: 1,
      x: Math.floor(gridSize * 0.7),
      y: Math.floor(gridSize * 0.5),
      influence: `hsla(260, 80%, 50%, 0.8)`,
      size: 2.5,
      type: "QUANTUM",
      symbolicSequence: "(Φ → Σ(Λ⊗Ψ)) : (∫(G/c²))",
      resonance: 0.9,
    },
  ];

  // Add standard agents
  for (let i = 2; i < count; i++) {
    const type = Math.random() > 0.8 ? "SYMBOLIC" : "STANDARD";
    const size = type === "SYMBOLIC" ? 1.5 : 1;

    agents.push({
      id: i,
      x: Math.floor(Math.random() * gridSize),
      y: Math.floor(Math.random() * gridSize),
      influence: [
        `hsla(${Math.floor(Math.random() * 360)}, 70%, 50%, 0.7)`,
        `hsla(${Math.floor(Math.random() * 360)}, 80%, 60%, 0.8)`,
        `hsla(${Math.floor(Math.random() * 360)}, 90%, 40%, 0.6)`,
      ][Math.floor(Math.random() * 3)],
      size,
      type,
      symbolicSequence:
        type === "SYMBOLIC"
          ? llmlInterpreter.generateRecursiveExpression()
          : undefined,
      resonance: type === "SYMBOLIC" ? 0.5 + Math.random() * 0.4 : undefined,
    });
  }

  return agents;
};

const patternRecognizer = new QuantumPatternRecognizer();
const quantumNN = new QuantumFeedforwardNN(4, 64, 10);
const cosmicWaltz = new CosmicWaltz(4, 8);
const fuzzyLogicEngine = new FuzzyLogicEngine(4, 16, 4);
const llmlInterpreter = new LLMLInterpreter();

const SimulationGrid = ({
  gridSize = 50,
  agents = generateRandomAgents(10, 50),
  isRunning = true,
}: SimulationGridProps) => {
  const [currentAgents, setCurrentAgents] = useState<Agent[]>(agents);
  const [cosmicCenter, setCosmicCenter] = useState({
    x: gridSize / 2,
    y: gridSize / 2,
  });
  const [spiralAngle, setSpiralAngle] = useState(0);
  const cellSize = Math.min(800 / gridSize, 800 / gridSize);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Draw cosmic spiral background
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const drawCosmicSpiral = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw spiral galaxy background
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;

      // Draw spiral arms
      for (let i = 0; i < 2; i++) {
        const startAngle = i * Math.PI;
        ctx.beginPath();

        for (
          let r = 0;
          r < Math.min(canvas.width, canvas.height) * 0.4;
          r += 0.5
        ) {
          const angle = startAngle + spiralAngle + r / 20;
          const x = centerX + r * Math.cos(angle);
          const y = centerY + r * Math.sin(angle);

          if (r === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }

        const gradient = ctx.createLinearGradient(
          0,
          0,
          canvas.width,
          canvas.height,
        );
        gradient.addColorStop(0, "rgba(255, 100, 50, 0.05)");
        gradient.addColorStop(0.5, "rgba(180, 50, 120, 0.05)");
        gradient.addColorStop(1, "rgba(80, 20, 140, 0.05)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 8;
        ctx.stroke();
      }

      // Draw cosmic center
      const centerGradient = ctx.createRadialGradient(
        centerX,
        centerY,
        0,
        centerX,
        centerY,
        30,
      );
      centerGradient.addColorStop(0, "rgba(255, 220, 50, 0.8)");
      centerGradient.addColorStop(0.7, "rgba(255, 150, 20, 0.4)");
      centerGradient.addColorStop(1, "rgba(255, 100, 0, 0)");

      ctx.beginPath();
      ctx.arc(centerX, centerY, 30, 0, Math.PI * 2);
      ctx.fillStyle = centerGradient;
      ctx.fill();

      // Draw stars
      for (let i = 0; i < 50; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const size = Math.random() * 2;
        const opacity = Math.random() * 0.5 + 0.3;

        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${opacity})`;
        ctx.fill();
      }
    };

    drawCosmicSpiral();

    // Animate spiral
    const animationInterval = setInterval(() => {
      setSpiralAngle((prev) => (prev + 0.002) % (Math.PI * 2));
      drawCosmicSpiral();
    }, 50);

    return () => clearInterval(animationInterval);
  }, [spiralAngle]);

  useEffect(() => {
    if (!isRunning) return;

    const interval = setInterval(() => {
      setCurrentAgents((prevAgents) => {
        const newAgents = prevAgents.map((agent) => {
          // Special movement for cosmic and quantum agents
          if (agent.type === "COSMIC" || agent.type === "QUANTUM") {
            // Calculate position based on spiral pattern
            const angle = spiralAngle + (agent.type === "COSMIC" ? 0 : Math.PI);
            const radius = gridSize * 0.2;

            return {
              ...agent,
              x: Math.floor(gridSize / 2 + radius * Math.cos(angle)),
              y: Math.floor(gridSize / 2 + radius * Math.sin(angle)),
            };
          }

          // Regular movement for other agents
          return {
            ...agent,
            x:
              (agent.x + Math.floor(Math.random() * 3) - 1 + gridSize) %
              gridSize,
            y:
              (agent.y + Math.floor(Math.random() * 3) - 1 + gridSize) %
              gridSize,
          };
        });

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
        return newAgents.map((agent, i) => {
          // Don't change cosmic and quantum agents
          if (agent.type === "COSMIC" || agent.type === "QUANTUM") {
            return agent;
          }

          // For symbolic agents, evolve their symbolic sequence
          if (agent.type === "SYMBOLIC" && agent.symbolicSequence) {
            const newSequence =
              Math.random() > 0.9
                ? llmlInterpreter.generateRecursiveExpression()
                : agent.symbolicSequence;

            return {
              ...agent,
              symbolicSequence: newSequence,
              resonance: Math.min(
                1,
                (agent.resonance || 0.5) + (Math.random() * 0.1 - 0.05),
              ),
              influence: `hsla(${((waltzResult.quantumStates[i % waltzResult.quantumStates.length]?.phase * 180) / Math.PI + 180) % 360}, 
                ${80 + (agent.resonance || 0.5) * 15}%, 
                ${60 + (agent.resonance || 0.5) * 30}%, 
                ${0.7 + (agent.resonance || 0.5) * 0.3})`,
            };
          }

          // For standard agents
          return {
            ...agent,
            influence: waltzResult.quantumStates[
              i % waltzResult.quantumStates.length
            ]
              ? `hsla(${((waltzResult.quantumStates[i % waltzResult.quantumStates.length].phase * 180) / Math.PI + 180) % 360}, 
                    ${70 + fuzzyOutputs[i % fuzzyOutputs.length] * 20}%, 
                    ${50 + waltzResult.resonance * 30}%, 
                    ${0.7 + fuzzyOutputs[i % fuzzyOutputs.length] * 0.3})`
              : agent.influence,
          };
        });
      });
    }, 500);

    return () => clearInterval(interval);
  }, [isRunning, gridSize]);

  return (
    <Card className="p-4 bg-background w-full h-full flex items-center justify-center">
      <div
        className="relative border border-border overflow-hidden"
        style={{
          width: `${gridSize * cellSize}px`,
          height: `${gridSize * cellSize}px`,
          background: "linear-gradient(to bottom, #0a0a1a, #1a1a2a)",
        }}
      >
        {/* Cosmic background canvas */}
        <canvas
          ref={canvasRef}
          width={gridSize * cellSize}
          height={gridSize * cellSize}
          className="absolute top-0 left-0 w-full h-full"
        />

        {/* Grid lines */}
        <div
          className="absolute inset-0 z-10 opacity-30"
          style={{
            backgroundSize: `${cellSize}px ${cellSize}px`,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.1) 1px, transparent 1px)",
          }}
        />

        {/* Agents */}
        {currentAgents.map((agent) => {
          const size = agent.size || 1;
          const isSpecial = agent.type === "COSMIC" || agent.type === "QUANTUM";
          const isSymbolic = agent.type === "SYMBOLIC";

          return (
            <div
              key={agent.id}
              className={`absolute rounded-full transition-all duration-500 ease-in-out z-20 flex items-center justify-center ${isSpecial ? "animate-pulse" : ""}`}
              style={{
                width: `${cellSize * 0.8 * size}px`,
                height: `${cellSize * 0.8 * size}px`,
                backgroundColor: agent.influence,
                left: `${agent.x * cellSize + cellSize * (0.1 / size)}px`,
                top: `${agent.y * cellSize + cellSize * (0.1 / size)}px`,
                boxShadow: `0 0 ${cellSize * 0.6 * size}px ${agent.influence}${isSpecial ? "90" : "40"}`,
                border: isSpecial
                  ? "2px solid rgba(255,255,255,0.8)"
                  : isSymbolic
                    ? "1px solid rgba(255,255,255,0.4)"
                    : "none",
              }}
            >
              {/* Show symbolic sequence for special agents */}
              {agent.symbolicSequence && (isSpecial || isSymbolic) && (
                <div
                  className="absolute whitespace-nowrap text-xs font-mono text-white opacity-80 overflow-hidden"
                  style={{
                    bottom: `${cellSize * -0.4}px`,
                    maxWidth: `${cellSize * 3}px`,
                    textOverflow: "ellipsis",
                    fontSize: isSpecial ? "0.6rem" : "0.5rem",
                  }}
                >
                  {agent.symbolicSequence}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SimulationGrid;
