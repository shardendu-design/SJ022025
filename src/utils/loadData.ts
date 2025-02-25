import { SensorData } from '../types';
import sensorData from './sensorData.json';

export const loadSensorData = (): SensorData[] => {
  return sensorData;
};