// src/types.ts
export interface DataPoint {
  value: number;
  date: string;
}

export interface SensorData {
  name: string;
  dataseries: DataPoint[];
}

export interface Chart {
  id: string;
  name: string;
  dataSeries: string; // Refers to the sensor name in data.json
  type: string; // Chart type (e.g., line, bar, etc.)
  color: string; // Chart color
  xAxisName: string; // X-axis label
  yAxisName: string; // Y-axis label
  description: string; // Chart description
}