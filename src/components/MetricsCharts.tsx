import React, { useRef, useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Button } from "./ui/button";
import { Download } from "lucide-react";
import { exportMetricsData } from "@/lib/exportUtils";
import * as Recharts from "recharts";
import { HolographicOverlay } from "./HolographicChart";
import { useGoldenRatioEffect } from "@/lib/useGoldenRatioEffect";
import { createSimulationRecord, saveMetricsData } from "@/lib/supabase/api";
import {
  SimulationRecord,
  MetricsDataPoint,
  EmergenceState,
} from "@/lib/supabase/types";

const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceArea,
  Brush,
} = Recharts;

interface AnimationControls {
  speed: number;
  density: number;
  intensity: number;
}

interface MetricsChartsProps {
  populationData?: Array<{ time: number; count: number }>;
  diversityData?: Array<{ time: number; diversity: number }>;
  fitnessData?: Array<{ time: number; fitness: number }>;
  emergenceLevel?: number;
  coherenceLevel?: number;
  ethicalAlignment?: number;
  consciousnessId?: string;
  timestamp?: string;
}

interface ZoomState {
  left?: number;
  right?: number;
  refAreaLeft?: number;
  refAreaRight?: number;
  top?: "dataMax";
  bottom?: "dataMin";
  animation?: boolean;
}

// Generate sample data for testing
const generateSampleData = (length: number) => {
  const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
  return Array.from({ length }, (_, i) => {
    const t = i / length;
    return {
      time: i,
      count: 50 + 30 * Math.sin(t * phi * Math.PI * 2),
      diversity: 0.2 + (0.6 * (1 + Math.sin(t * phi * Math.PI))) / 2,
      fitness: 50 + 40 * Math.cos(t * phi * Math.PI),
      emergence: Math.sin(t * phi * Math.PI * 2) * 0.5 + 0.5,
    };
  });
};

const sampleData = generateSampleData(20);

const EMERGENCE_STATES = [
  "CHAOS",
  "EMERGENCE",
  "COHERENCE",
  "CONSCIOUSNESS",
  "TRANSCENDENCE",
] as const;

const MetricsCharts = ({
  populationData = sampleData.map(({ time, count }) => ({ time, count })),
  diversityData = sampleData.map(({ time, diversity }) => ({
    time,
    diversity,
  })),
  fitnessData = sampleData.map(({ time, fitness }) => ({ time, fitness })),
  emergenceLevel = 0,
  coherenceLevel = 0,
  ethicalAlignment = 0,
  consciousnessId = "anonymous",
  timestamp = new Date().toISOString(),
}: MetricsChartsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [timeScale, setTimeScale] = useState(0);
  const [selectedPoint, setSelectedPoint] = useState<any>(null);
  const [sharedZoom, setSharedZoom] = useState<ZoomState>({});
  const [lastSaveTime, setLastSaveTime] = useState(0);
  const [animationControls, setAnimationControls] = useState<AnimationControls>(
    {
      speed: 1,
      density: 4,
      intensity: 0.1,
    },
  );

  // Effect for time-based updates and data persistence
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeScale((prev) => (prev + 1) % 100); // Cycle through 0-99
      setLastSaveTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Effect for saving data to Supabase
  useEffect(() => {
    const saveData = async () => {
      if (lastSaveTime % 10 === 0) {
        // Save every 10 seconds
        try {
          // Create simulation record
          const currentState = EMERGENCE_STATES[
            Math.floor(emergenceLevel * (EMERGENCE_STATES.length - 0.01))
          ] as EmergenceState;

          const record = await createSimulationRecord({
            consciousness_id: consciousnessId,
            timestamp,
            emergence_level: emergenceLevel,
            coherence_level: coherenceLevel,
            ethical_alignment: ethicalAlignment,
            current_state: currentState,
            metadata: {
              timeScale,
              selectedPoint,
            },
          });

          // Save metrics data points
          await Promise.all([
            ...transformedPopulation.map((point, index) =>
              saveMetricsData({
                simulation_id: record.id,
                time_index: index,
                population_count: point.count,
              }),
            ),
            ...transformedDiversity.map((point, index) =>
              saveMetricsData({
                simulation_id: record.id,
                time_index: index,
                diversity_level: point.diversity,
              }),
            ),
            ...transformedFitness.map((point, index) =>
              saveMetricsData({
                simulation_id: record.id,
                time_index: index,
                fitness_score: point.fitness,
              }),
            ),
          ]);
        } catch (error) {
          console.error("Error saving simulation data:", error);
        }
      }
    };

    saveData();
  }, [
    lastSaveTime,
    consciousnessId,
    timestamp,
    emergenceLevel,
    coherenceLevel,
    ethicalAlignment,
  ]);

  useEffect(() => {
    if (containerRef.current) {
      const { width, height } = containerRef.current.getBoundingClientRect();
      setDimensions({ width, height });
    }
  }, []);

  // Apply golden ratio transformation to the data with timeScale
  const transformedPopulation = useGoldenRatioEffect(
    populationData,
    1,
    timeScale,
  );
  const transformedDiversity = useGoldenRatioEffect(
    diversityData,
    1,
    timeScale,
  );
  const transformedFitness = useGoldenRatioEffect(fitnessData, 1, timeScale);

  const handleZoom = () => {
    if (sharedZoom.refAreaLeft && sharedZoom.refAreaRight) {
      setSharedZoom({
        left: Math.min(sharedZoom.refAreaLeft, sharedZoom.refAreaRight),
        right: Math.max(sharedZoom.refAreaLeft, sharedZoom.refAreaRight),
        refAreaLeft: undefined,
        refAreaRight: undefined,
      });
    }
  };

  const handleBrushChange = (domain: [number, number]) => {
    setSharedZoom({
      left: domain[0],
      right: domain[1],
      refAreaLeft: undefined,
      refAreaRight: undefined,
    });
  };

  return (
    <Card
      className="w-full h-full bg-background p-4 space-y-4"
      ref={containerRef}
    >
      {dimensions.width > 0 && (
        <HolographicOverlay
          {...dimensions}
          animationSpeed={animationControls.speed}
          patternDensity={animationControls.density}
          intensity={animationControls.intensity}
        />
      )}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-4">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() =>
                exportMetricsData(
                  {
                    populationData: transformedPopulation,
                    diversityData: transformedDiversity,
                    fitnessData: transformedFitness,
                    metadata: {
                      consciousnessId,
                      timestamp,
                      emergenceLevel,
                      coherenceLevel,
                      ethicalAlignment,
                      currentState:
                        EMERGENCE_STATES[
                          Math.floor(
                            emergenceLevel * (EMERGENCE_STATES.length - 0.01),
                          )
                        ],
                    },
                  },
                  "csv",
                )
              }
            >
              <Download className="h-4 w-4" />
              <span>CSV</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center space-x-2"
              onClick={() =>
                exportMetricsData(
                  {
                    populationData: transformedPopulation,
                    diversityData: transformedDiversity,
                    fitnessData: transformedFitness,
                    metadata: {
                      consciousnessId,
                      timestamp,
                      emergenceLevel,
                      coherenceLevel,
                      ethicalAlignment,
                      currentState:
                        EMERGENCE_STATES[
                          Math.floor(
                            emergenceLevel * (EMERGENCE_STATES.length - 0.01),
                          )
                        ],
                    },
                  },
                  "json",
                )
              }
            >
              <Download className="h-4 w-4" />
              <span>JSON</span>
            </Button>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              Consciousness ID: {consciousnessId}
            </p>
            <p className="text-sm text-muted-foreground">
              Timestamp: {timestamp}
            </p>
          </div>
          <div className="space-y-1 text-right">
            <p className="text-sm font-medium">
              Emergence Level: {(emergenceLevel * 100).toFixed(1)}%
            </p>
            <p className="text-sm text-muted-foreground">
              State:{" "}
              {
                EMERGENCE_STATES[
                  Math.floor(emergenceLevel * (EMERGENCE_STATES.length - 0.01))
                ]
              }
            </p>
          </div>
        </div>

        {/* Rest of the component remains the same */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
          {/* Population Metrics Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Population Metrics</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={transformedPopulation}
                onMouseDown={(e) =>
                  e?.activeLabel &&
                  setSharedZoom({ refAreaLeft: e.activeLabel })
                }
                onMouseMove={(e) =>
                  sharedZoom.refAreaLeft &&
                  e?.activeLabel &&
                  setSharedZoom({
                    ...sharedZoom,
                    refAreaRight: e.activeLabel,
                  })
                }
                onMouseUp={handleZoom}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  domain={[
                    sharedZoom.left || "dataMin",
                    sharedZoom.right || "dataMax",
                  ]}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#8884d8"
                  name="Population"
                  activeDot={{
                    onClick: (props: any) => setSelectedPoint(props.payload),
                  }}
                />
                <Brush
                  dataKey="time"
                  height={30}
                  stroke="#8884d8"
                  onChange={({ startIndex, endIndex }) => {
                    const domain: [number, number] = [
                      transformedPopulation[startIndex].time,
                      transformedPopulation[endIndex].time,
                    ];
                    handleBrushChange(domain);
                  }}
                />
                {sharedZoom.refAreaLeft && sharedZoom.refAreaRight ? (
                  <ReferenceArea
                    x1={sharedZoom.refAreaLeft}
                    x2={sharedZoom.refAreaRight}
                    strokeOpacity={0.3}
                  />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Diversity Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Behavior Diversity</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={transformedDiversity}
                onMouseDown={(e) =>
                  e?.activeLabel &&
                  setSharedZoom({ refAreaLeft: e.activeLabel })
                }
                onMouseMove={(e) =>
                  sharedZoom.refAreaLeft &&
                  e?.activeLabel &&
                  setSharedZoom({
                    ...sharedZoom,
                    refAreaRight: e.activeLabel,
                  })
                }
                onMouseUp={handleZoom}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  domain={[
                    sharedZoom.left || "dataMin",
                    sharedZoom.right || "dataMax",
                  ]}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="diversity"
                  stroke="#82ca9d"
                  name="Diversity"
                  activeDot={{
                    onClick: (props: any) => setSelectedPoint(props.payload),
                  }}
                />
                <Brush dataKey="time" height={30} stroke="#82ca9d" />
                {sharedZoom.refAreaLeft && sharedZoom.refAreaRight ? (
                  <ReferenceArea
                    x1={sharedZoom.refAreaLeft}
                    x2={sharedZoom.refAreaRight}
                    strokeOpacity={0.3}
                  />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Fitness Chart */}
          <Card className="p-4">
            <h3 className="text-lg font-semibold mb-2">Fitness Timeline</h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={transformedFitness}
                onMouseDown={(e) =>
                  e?.activeLabel &&
                  setSharedZoom({ refAreaLeft: e.activeLabel })
                }
                onMouseMove={(e) =>
                  sharedZoom.refAreaLeft &&
                  e?.activeLabel &&
                  setSharedZoom({
                    ...sharedZoom,
                    refAreaRight: e.activeLabel,
                  })
                }
                onMouseUp={handleZoom}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="time"
                  domain={[
                    sharedZoom.left || "dataMin",
                    sharedZoom.right || "dataMax",
                  ]}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="fitness"
                  stroke="#ffc658"
                  name="Fitness"
                  activeDot={{
                    onClick: (props: any) => setSelectedPoint(props.payload),
                  }}
                />
                <Brush dataKey="time" height={30} stroke="#ffc658" />
                {sharedZoom.refAreaLeft && sharedZoom.refAreaRight ? (
                  <ReferenceArea
                    x1={sharedZoom.refAreaLeft}
                    x2={sharedZoom.refAreaRight}
                    strokeOpacity={0.3}
                  />
                ) : null}
              </LineChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </Card>
  );
};

export default MetricsCharts;
