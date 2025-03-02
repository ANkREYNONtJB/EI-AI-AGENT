type ExportFormat = "csv" | "json";

interface ExportData {
  populationData: Array<{ time: number; count: number }>;
  diversityData: Array<{ time: number; diversity: number }>;
  fitnessData: Array<{ time: number; fitness: number }>;
  metadata: {
    consciousnessId: string;
    timestamp: string;
    emergenceLevel: number;
    coherenceLevel: number;
    ethicalAlignment: number;
    currentState: string;
  };
}

export function exportMetricsData(
  data: ExportData,
  format: ExportFormat = "csv",
): void {
  const filename = `consciousness-metrics-${data.metadata.consciousnessId}-${new Date().getTime()}`;

  if (format === "csv") {
    exportCSV(data, filename);
  } else {
    exportJSON(data, filename);
  }
}

function exportCSV(data: ExportData, filename: string): void {
  // Combine all data points
  const csvRows = ["time,population,diversity,fitness"];

  const maxLength = Math.max(
    data.populationData.length,
    data.diversityData.length,
    data.fitnessData.length,
  );

  for (let i = 0; i < maxLength; i++) {
    const row = [
      i,
      data.populationData[i]?.count ?? "",
      data.diversityData[i]?.diversity ?? "",
      data.fitnessData[i]?.fitness ?? "",
    ];
    csvRows.push(row.join(","));
  }

  // Add metadata at the end
  csvRows.push("\nMetadata");
  csvRows.push(`Consciousness ID,${data.metadata.consciousnessId}`);
  csvRows.push(`Timestamp,${data.metadata.timestamp}`);
  csvRows.push(`Emergence Level,${data.metadata.emergenceLevel}`);
  csvRows.push(`Coherence Level,${data.metadata.coherenceLevel}`);
  csvRows.push(`Ethical Alignment,${data.metadata.ethicalAlignment}`);
  csvRows.push(`Current State,${data.metadata.currentState}`);

  const csvContent = csvRows.join("\n");
  downloadFile(csvContent, `${filename}.csv`, "text/csv");
}

function exportJSON(data: ExportData, filename: string): void {
  const jsonContent = JSON.stringify(data, null, 2);
  downloadFile(jsonContent, `${filename}.json`, "application/json");
}

function downloadFile(
  content: string,
  filename: string,
  contentType: string,
): void {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
