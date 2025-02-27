// utils/loadData.ts
import data from '../data.json';
import { SensorData } from '../types';

export const loadSensorData = (): SensorData[] => {
  return data;
};