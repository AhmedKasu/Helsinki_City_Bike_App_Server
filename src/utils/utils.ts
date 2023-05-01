import { Journey } from '../types';
import { round } from 'lodash';

export const averageDistance = (journeysArray: Array<Journey>) => {
  const validJourneysArray = journeysArray.length > 0;
  const average =
    journeysArray.reduce(
      (total: number, journey: Journey) =>
        total +
        //some journeys are missing covered distance
        (journey.coveredDistanceMeters ? journey.coveredDistanceMeters : 0),
      0
    ) / journeysArray.length;

  return validJourneysArray ? round(average) : 0;
};
