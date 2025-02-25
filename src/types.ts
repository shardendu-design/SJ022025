export interface SensorData {
    name: string;
    dataseries: { value: number; date: string }[];
  }
  
  export interface Chart {
    id: string;
    name: string;
    description?: string;
    dataSeriesId: string;
  }