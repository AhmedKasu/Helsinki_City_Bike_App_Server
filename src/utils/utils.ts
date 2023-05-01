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

interface Arr {
  [key: string]: unknown;
  journeys: number;
}

export const findOccurrence = (journeysArray: Journey[], key: string) => {
  const journeyOccurrences: Arr[] = [];

  journeysArray.forEach((journey) => {
    const journeyKey =
      key === 'returnStationName'
        ? journey.returnStationName
        : journey.departureStationName;
    if (
      journeyOccurrences.some((val) => {
        return val[key] == journeyKey;
      })
    ) {
      journeyOccurrences.forEach((k) => {
        if (k[key] === journeyKey) {
          k.journeys += 1;
        }
      });
    } else {
      const a: Arr = { [key]: '', journeys: 0 };
      a[key] = journeyKey;
      a.journeys = 1;
      journeyOccurrences.push(a);
    }
  });

  return journeyOccurrences.sort((a, b) => b.journeys - a.journeys).slice(0, 5);
};
