import React, { useState } from "react";
import SimulationGrid from "./SimulationGrid";
import ControlPanel from "./ControlPanel";
import StatisticsPanel from "./StatisticsPanel";
import MetricsCharts from "./MetricsCharts";

const Home = () => {
  const [isRunning, setIsRunning] = useState(true);
  const [gridSize, setGridSize] = useState(50);
  const [simulationSpeed, setSimulationSpeed] = useState(50);
  const [agentCount, setAgentCount] = useState(10);

  return (
    <div className="min-h-screen w-full bg-background p-6 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-foreground">
        AI Agent Simulation Dashboard
      </h1>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6 h-full">
        {/* Main simulation grid - spans 3 columns on xl screens */}
        <div className="xl:col-span-3 h-[800px]">
          <SimulationGrid
            gridSize={gridSize}
            isRunning={isRunning}
            agents={Array.from({ length: agentCount }, (_, i) => ({
              id: i,
              x: Math.floor(Math.random() * gridSize),
              y: Math.floor(Math.random() * gridSize),
              influence: ["#FF0000", "#00FF00", "#0000FF"][
                Math.floor(Math.random() * 3)
              ],
            }))}
          />
        </div>

        {/* Control panel - 1 column */}
        <div className="xl:col-span-1">
          <ControlPanel
            isRunning={isRunning}
            onSimulationToggle={setIsRunning}
            onSpeedChange={setSimulationSpeed}
            onAgentCountChange={setAgentCount}
            onGridSizeChange={setGridSize}
          />
        </div>

        {/* Statistics panel - spans 2 columns on xl screens */}
        <div className="xl:col-span-2 h-[300px]">
          <StatisticsPanel />
        </div>

        {/* Metrics charts - spans 2 columns on xl screens */}
        <div className="xl:col-span-2 h-[400px]">
          <MetricsCharts />
        </div>
      </div>
    </div>
  );
};

export default Home;
