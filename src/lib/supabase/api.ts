import { supabase } from "../supabase";
import { SimulationRecord, MetricsDataPoint } from "./types";

export async function createSimulationRecord(
  data: Omit<SimulationRecord, "id">,
): Promise<SimulationRecord> {
  if (!supabase) {
    console.warn("Supabase client not initialized");
    return { ...data, id: `local-${Date.now()}` } as SimulationRecord;
  }

  const { data: record, error } = await supabase
    .from("simulation_records")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return record;
}

export async function saveMetricsData(
  data: Omit<MetricsDataPoint, "id" | "created_at">,
): Promise<MetricsDataPoint> {
  if (!supabase) {
    console.warn("Supabase client not initialized");
    return {
      ...data,
      id: `local-${Date.now()}`,
      created_at: new Date().toISOString(),
    } as MetricsDataPoint;
  }

  const { data: metrics, error } = await supabase
    .from("metrics_data")
    .insert([data])
    .select()
    .single();

  if (error) throw error;
  return metrics;
}

export async function getSimulationHistory(
  limit = 10,
): Promise<SimulationRecord[]> {
  if (!supabase) {
    console.warn("Supabase client not initialized");
    return [];
  }

  const { data, error } = await supabase
    .from("simulation_records")
    .select("*")
    .order("timestamp", { ascending: false })
    .limit(limit);

  if (error) throw error;
  return data;
}

export async function getMetricsForSimulation(
  simulationId: string,
): Promise<MetricsDataPoint[]> {
  if (!supabase) {
    console.warn("Supabase client not initialized");
    return [];
  }

  const { data, error } = await supabase
    .from("metrics_data")
    .select("*")
    .eq("simulation_id", simulationId)
    .order("time_index");

  if (error) throw error;
  return data;
}
