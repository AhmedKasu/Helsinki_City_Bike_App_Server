export type Journey = {
  departure: string;
  return: string;
  departureStationId: string;
  returnStationName: string;
  returnStationId: string;
  departureStationName: string;
  coveredDistance: string;
  duration: string;
};

export type Journeys = Array<Journey>;
