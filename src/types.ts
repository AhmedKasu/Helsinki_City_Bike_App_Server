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
export interface Station {
  fId: number;
  id: number;
  nimi: string;
  namn: string;
  name: string;
  osoite: string;
  adress: string;
  kaupunki: string;
  stad: string;
  operaattor: string;
  kapasiteet: number;
  x: number;
  y: number;
}
export interface OrderBy {
  [key: string]: SortOrder;
}

export enum SortOrder {
  Ascending = 'asc',
  Descending = 'desc',
}

export enum Default {
  DistanceDurration = 10,
  MaxQueryLimit = 600,
  MinQueryLimit = 50,
  Year = 2021,
  CurrentPage = 1,
}
