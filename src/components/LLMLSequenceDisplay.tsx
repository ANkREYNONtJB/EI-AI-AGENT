import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { FuzzyLogicEngine } from "@/lib/quantum/FuzzyLogicEngine";

interface LLMLSequenceDisplayProps {
  refreshInterval?: number;
}

const LLMLSequenceDisplay = ({
  refreshInterval = 5000,
}: LLMLSequenceDisplayProps) => {
  const [currentSequence, setCurrentSequence] = useState<string>("");
  const [fuzzyEngine] = useState(() => new FuzzyLogicEngine());

  useEffect(() => {
    // Generate initial sequence
    setCurrentSequence(fuzzyEngine.generateSymbolicSequence());

    // Set up interval to refresh sequence
    const interval = setInterval(() => {
      setCurrentSequence(fuzzyEngine.generateSymbolicSequence());
    }, refreshInterval);

    return () => clearInterval(interval);
  }, [fuzzyEngine, refreshInterval]);

  return (
    <Card className="bg-background w-full h-full">
      <CardHeader>
        <CardTitle>Quantum Symbolic Sequence</CardTitle>
      </CardHeader>
      <CardContent className="flex items-center justify-center h-[calc(100%-4rem)]">
        <div className="text-2xl font-mono text-center p-4 bg-secondary/10 rounded-lg w-full">
          {currentSequence}
        </div>
      </CardContent>
    </Card>
  );
};

export default LLMLSequenceDisplay;
