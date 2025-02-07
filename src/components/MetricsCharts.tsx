import React from "react";
import { Card } from "./ui/card";
import * as Recharts from "recharts";
const {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} = Recharts;

interface MetricsChartsProps {
  populationData?: Array<{ time: number; count: number }>;
  diversityData?: Array<{ time: number; diversity: number }>;
  fitnessData?: Array<{ time: number; fitness: number }>;
}

const defaultPopulationData = Array.from({ length: 10 }, (_, i) => ({
  time: i,
  count: Math.floor(Math.random() * 100) + 50,
}));

const defaultDiversityData = Array.from({ length: 10 }, (_, i) => ({
  time: i,
  diversity: Math.random() * 0.8 + 0.2,
}));

const defaultFitnessData = Array.from({ length: 10 }, (_, i) => ({
  time: i,
  fitness: Math.floor(Math.random() * 100),
}));

const MetricsCharts = ({
  populationData = defaultPopulationData,
  diversityData = defaultDiversityData,
  fitnessData = defaultFitnessData,
}: MetricsChartsProps) => {
  return (
    <div className="w-full h-[400px] bg-background p-4 space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 h-full">
        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Population Metrics</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={populationData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="count"
                stroke="#8884d8"
                name="Population"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Behavior Diversity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={diversityData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="diversity"
                stroke="#82ca9d"
                name="Diversity"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card className="p-4">
          <h3 className="text-lg font-semibold mb-2">Fitness Timeline</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={fitnessData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="time" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="fitness"
                stroke="#ffc658"
                name="Fitness"
              />
            </LineChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </div>
  );
};

export default MetricsCharts;
