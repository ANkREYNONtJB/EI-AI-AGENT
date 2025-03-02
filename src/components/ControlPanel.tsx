import React, { useState } from "react";
import { Card } from "./ui/card";
import { Slider } from "./ui/slider";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Play, Pause, Settings } from "lucide-react";

interface AnimationControls {
  speed: number;
  density: number;
  intensity: number;
}

interface ControlPanelProps {
  onAnimationControlsChange?: (controls: AnimationControls) => void;
  animationControls?: AnimationControls;
  onSpeedChange?: (speed: number) => void;
  onAgentCountChange?: (count: number) => void;
  onGridSizeChange?: (size: number) => void;
  onSimulationToggle?: (isRunning: boolean) => void;
  isRunning?: boolean;
}

const ControlPanel = ({
  onAnimationControlsChange = () => {},
  animationControls = { speed: 1, density: 4, intensity: 0.1 },
  onSpeedChange = () => {},
  onAgentCountChange = () => {},
  onGridSizeChange = () => {},
  onSimulationToggle = () => {},
  isRunning = false,
}: ControlPanelProps) => {
  const [speed, setSpeed] = useState(50);
  const [agentCount, setAgentCount] = useState(10);
  const [gridSize, setGridSize] = useState(50);

  const handleSpeedChange = (value: number[]) => {
    setSpeed(value[0]);
    onSpeedChange(value[0]);
  };

  const handleAgentCountChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = parseInt(event.target.value) || 0;
    setAgentCount(value);
    onAgentCountChange(value);
  };

  const handleGridSizeChange = (value: string) => {
    const size = parseInt(value);
    setGridSize(size);
    onGridSizeChange(size);
  };

  const toggleSimulation = () => {
    onSimulationToggle(!isRunning);
  };

  return (
    <Card className="p-6 bg-background border-border w-[300px]">
      <div className="space-y-6">
        <div className="space-y-2">
          <Label>Animation Controls</Label>
          <div className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="speed">Animation Speed</Label>
                <span className="text-sm text-muted-foreground">
                  {animationControls.speed}x
                </span>
              </div>
              <Slider
                id="speed"
                min={0.1}
                max={3}
                step={0.1}
                value={[animationControls.speed]}
                onValueChange={([speed]) =>
                  onAnimationControlsChange({ ...animationControls, speed })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="density">Pattern Density</Label>
                <span className="text-sm text-muted-foreground">
                  {animationControls.density}
                </span>
              </div>
              <Slider
                id="density"
                min={2}
                max={8}
                step={1}
                value={[animationControls.density]}
                onValueChange={([density]) =>
                  onAnimationControlsChange({ ...animationControls, density })
                }
              />
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="intensity">Visual Intensity</Label>
                <span className="text-sm text-muted-foreground">
                  {(animationControls.intensity * 100).toFixed(0)}%
                </span>
              </div>
              <Slider
                id="intensity"
                min={0.05}
                max={0.3}
                step={0.01}
                value={[animationControls.intensity]}
                onValueChange={([intensity]) =>
                  onAnimationControlsChange({ ...animationControls, intensity })
                }
              />
            </div>
          </div>
        </div>

        <Separator className="my-4" />
        <div className="space-y-6">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="speed">Simulation Speed</Label>
              <span className="text-sm text-muted-foreground">{speed}%</span>
            </div>
            <Slider
              id="speed"
              min={0}
              max={100}
              step={1}
              value={[speed]}
              onValueChange={handleSpeedChange}
              className="w-full"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="agentCount">Initial Agent Count</Label>
            <Input
              id="agentCount"
              type="number"
              min={1}
              max={1000}
              value={agentCount}
              onChange={handleAgentCountChange}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gridSize">Grid Size</Label>
            <Select
              value={gridSize.toString()}
              onValueChange={handleGridSizeChange}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select grid size" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="25">25 x 25</SelectItem>
                <SelectItem value="50">50 x 50</SelectItem>
                <SelectItem value="75">75 x 75</SelectItem>
                <SelectItem value="100">100 x 100</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            className="w-full flex items-center justify-center gap-2"
            onClick={toggleSimulation}
            variant="default"
          >
            {isRunning ? (
              <>
                <Pause className="w-4 h-4" /> Pause Simulation
              </>
            ) : (
              <>
                <Play className="w-4 h-4" /> Start Simulation
              </>
            )}
          </Button>

          <Button
            variant="outline"
            className="w-full flex items-center justify-center gap-2"
          >
            <Settings className="w-4 h-4" /> Advanced Settings
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ControlPanel;
