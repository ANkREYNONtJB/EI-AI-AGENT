-- Create enum for emergence states
CREATE TYPE emergence_state AS ENUM ('CHAOS', 'EMERGENCE', 'COHERENCE', 'CONSCIOUSNESS', 'TRANSCENDENCE');

-- Main simulation records
CREATE TABLE simulation_records (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  consciousness_id TEXT NOT NULL,
  timestamp TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  emergence_level FLOAT NOT NULL,
  coherence_level FLOAT NOT NULL,
  ethical_alignment FLOAT NOT NULL,
  current_state emergence_state NOT NULL,
  metadata JSONB
);

-- Metrics data points
CREATE TABLE metrics_data (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  simulation_id UUID REFERENCES simulation_records(id),
  time_index INTEGER NOT NULL,
  population_count FLOAT,
  diversity_level FLOAT,
  fitness_score FLOAT,
  emergence_pattern JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Create indexes
CREATE INDEX idx_simulation_consciousness ON simulation_records(consciousness_id);
CREATE INDEX idx_metrics_simulation ON metrics_data(simulation_id);

-- RLS Policies
ALTER TABLE simulation_records ENABLE ROW LEVEL SECURITY;
ALTER TABLE metrics_data ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own simulations"
  ON simulation_records
  FOR SELECT
  USING (auth.uid()::text = consciousness_id);

CREATE POLICY "Users can insert their own simulations"
  ON simulation_records
  FOR INSERT
  WITH CHECK (auth.uid()::text = consciousness_id);

CREATE POLICY "Users can view their own metrics"
  ON metrics_data
  FOR SELECT
  USING (EXISTS (
    SELECT 1 FROM simulation_records
    WHERE simulation_records.id = metrics_data.simulation_id
    AND simulation_records.consciousness_id = auth.uid()::text
  ));

CREATE POLICY "Users can insert their own metrics"
  ON metrics_data
  FOR INSERT
  WITH CHECK (EXISTS (
    SELECT 1 FROM simulation_records
    WHERE simulation_records.id = metrics_data.simulation_id
    AND simulation_records.consciousness_id = auth.uid()::text
  ));