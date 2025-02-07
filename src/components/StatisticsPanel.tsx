import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { ScrollArea } from "./ui/scroll-area";

interface BehaviorItem {
  id: string;
  name: string;
  frequency: number;
  sequence: string;
}

interface SymbolicSequence {
  id: string;
  sequence: string;
  occurrence: number;
  impact: number;
}

interface StatisticsPanelProps {
  behaviors?: BehaviorItem[];
  sequences?: SymbolicSequence[];
}

const defaultBehaviors: BehaviorItem[] = [
  {
    id: "1",
    name: "Foraging",
    frequency: 45,
    sequence: "MOVE->COLLECT->RETURN",
  },
  { id: "2", name: "Exploration", frequency: 30, sequence: "MOVE->SCAN->MOVE" },
  { id: "3", name: "Defense", frequency: 25, sequence: "DETECT->ALERT->GUARD" },
];

const defaultSequences: SymbolicSequence[] = [
  { id: "1", sequence: "α→β→γ", occurrence: 78, impact: 0.85 },
  { id: "2", sequence: "δ→ε→ζ", occurrence: 65, impact: 0.72 },
  { id: "3", sequence: "η→θ→ι", occurrence: 43, impact: 0.64 },
];

const StatisticsPanel = ({
  behaviors = defaultBehaviors,
  sequences = defaultSequences,
}: StatisticsPanelProps) => {
  return (
    <div className="bg-background w-full h-full p-4 space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Top Behaviors</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px]">
            <div className="space-y-2">
              {behaviors.map((behavior) => (
                <div
                  key={behavior.id}
                  className="flex justify-between items-center p-2 rounded-lg bg-secondary/10"
                >
                  <div>
                    <div className="font-medium">{behavior.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {behavior.sequence}
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {behavior.frequency}%
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Symbolic Sequences</CardTitle>
        </CardHeader>
        <CardContent>
          <ScrollArea className="h-[120px]">
            <div className="space-y-2">
              {sequences.map((sequence) => (
                <div
                  key={sequence.id}
                  className="flex justify-between items-center p-2 rounded-lg bg-secondary/10"
                >
                  <div>
                    <div className="font-medium">{sequence.sequence}</div>
                    <div className="text-sm text-muted-foreground">
                      Impact: {(sequence.impact * 100).toFixed(0)}%
                    </div>
                  </div>
                  <div className="text-sm font-medium">
                    {sequence.occurrence} occurrences
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </CardContent>
      </Card>
    </div>
  );
};

export default StatisticsPanel;
