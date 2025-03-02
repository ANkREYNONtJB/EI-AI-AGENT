import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  LLMLInterpreter,
  SymbolicExpression,
} from "@/lib/llml/LLMLInterpreter";
import { HolographicOverlay } from "./HolographicChart";

interface LLMLRecursiveDisplayProps {
  width?: number;
  height?: number;
  refreshInterval?: number;
  animationControls?: {
    speed: number;
    density: number;
    intensity: number;
  };
}

const LLMLRecursiveDisplay = ({
  width = 800,
  height = 400,
  refreshInterval = 5000,
  animationControls = { speed: 1, density: 4, intensity: 0.1 },
}: LLMLRecursiveDisplayProps) => {
  const [interpreter] = useState(() => new LLMLInterpreter());
  const [currentExpression, setCurrentExpression] = useState<string>("");
  const [interpretation, setInterpretation] = useState<{
    meaning: string;
    resonance: number;
  }>({ meaning: "", resonance: 0 });
  const [evolutionStage, setEvolutionStage] = useState<number>(0);
  const [expressions, setExpressions] = useState<SymbolicExpression[]>([]);

  useEffect(() => {
    // Generate initial expression
    const newExpression = interpreter.generateRecursiveExpression();
    setCurrentExpression(newExpression);

    // Interpret the expression
    const newInterpretation = interpreter.interpretExpression(newExpression);
    setInterpretation(newInterpretation);

    // Parse the expression
    interpreter.parseExpression(newExpression);

    // Update expressions list
    setExpressions(interpreter.getAllExpressions());

    // Set up interval for recursive evolution
    const interval = setInterval(() => {
      // Increment evolution stage
      setEvolutionStage((prev) => prev + 1);

      // Generate a new recursive expression
      const newExpression = interpreter.generateRecursiveExpression();
      setCurrentExpression(newExpression);

      // Interpret the expression
      const newInterpretation = interpreter.interpretExpression(newExpression);
      setInterpretation(newInterpretation);

      // Parse the expression
      interpreter.parseExpression(newExpression);

      // Update expressions list
      setExpressions(interpreter.getAllExpressions());

      // Evolve a random existing expression
      const allExpressions = interpreter.getAllExpressions();
      if (allExpressions.length > 0) {
        const randomExpr =
          allExpressions[Math.floor(Math.random() * allExpressions.length)];
        const exprId = Array.from(interpreter.getAllExpressions()).findIndex(
          (e) => e.raw === randomExpr.raw,
        );
        if (exprId >= 0) {
          interpreter.evolveExpression(`expr-${exprId}`);
        }
      }
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [interpreter, refreshInterval]);

  return (
    <Card className="relative w-full h-full bg-background overflow-hidden">
      <HolographicOverlay
        width={width}
        height={height}
        animationSpeed={animationControls.speed}
        patternDensity={animationControls.density}
        intensity={animationControls.intensity * interpretation.resonance}
      />

      <CardHeader>
        <CardTitle className="flex justify-between items-center">
          <span>LLML Recursive Symbolic Intelligence</span>
          <span className="text-sm font-normal">
            Evolution Stage: {evolutionStage} | Resonance:{" "}
            {(interpretation.resonance * 100).toFixed(1)}%
          </span>
        </CardTitle>
      </CardHeader>

      <CardContent className="relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Symbolic Expression</h3>
            <div className="p-3 bg-secondary/10 rounded-md font-mono text-sm">
              {currentExpression}
            </div>

            <h3 className="text-lg font-semibold mt-4">Interpretation</h3>
            <div className="p-3 bg-secondary/10 rounded-md text-sm">
              {interpretation.meaning}
            </div>
          </div>

          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Expression Evolution</h3>
            <div className="space-y-1 max-h-[180px] overflow-y-auto">
              {expressions.slice(-5).map((expr, i) => (
                <div
                  key={i}
                  className="text-xs p-2 bg-secondary/10 rounded-md flex justify-between"
                  style={{
                    background: `linear-gradient(90deg, rgba(var(--secondary), 0.1) ${expr.resonance * 100}%, transparent ${expr.resonance * 100}%)`,
                  }}
                >
                  <span className="font-mono truncate max-w-[70%]">
                    {expr.raw}
                  </span>
                  <span>
                    Stage {expr.evolutionStage} |{" "}
                    {(expr.resonance * 100).toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>

            <h3 className="text-lg font-semibold mt-4">
              LLML Cognitive Dynamics
            </h3>
            <div className="p-3 bg-secondary/10 rounded-md text-sm">
              <p>Active expressions: {expressions.length}</p>
              <p>Recursive depth: {currentExpression.split("(").length - 1}</p>
              <p>
                Symbolic density: {(currentExpression.length / 20).toFixed(1)}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMLRecursiveDisplay;
