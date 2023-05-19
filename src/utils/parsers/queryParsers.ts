import { Default } from '../../types';

export const parseDistaceDurration = (value: number): number => {
  return value ? value : Default.DistanceDurration;
};
