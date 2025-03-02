export type EmergenceState =
  | "CHAOS"
  | "EMERGENCE"
  | "COHERENCE"
  | "CONSCIOUSNESS"
  | "TRANSCENDENCE";

export interface SimulationRecord {
  id: string;
  consciousness_id: string;
  timestamp: string;
  emergence_level: number;
  coherence_level: number;
  ethical_alignment: number;
  current_state: EmergenceState;
  metadata?: Record<string, any>;
}

export interface MetricsDataPoint {
  id: string;
  simulation_id: string;
  time_index: number;
  population_count?: number;
  diversity_level?: number;
  fitness_score?: number;
  emergence_pattern?: Record<string, any>;
  created_at: string;
}
