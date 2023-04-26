export interface PaginationDetails {
  resultsTotal: number;
  currentPage: number;
  limit: number;
  nextPage: boolean;
  previousPage: boolean;
}

export interface Journey {
  departure: string;
  return: string;
  departureStationId: number;
  returnStationName: string;
  returnStationId: number;
  departureStationName: string;
  coveredDistanceMeters: number;
  durationSeconds: number;
}

export enum Default {
  DistanceDurration = 10,
  MaxQueryLimit = 600,
  MinQueryLimit = 50,
}
