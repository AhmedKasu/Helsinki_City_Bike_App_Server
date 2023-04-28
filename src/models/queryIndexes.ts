import { journeySchema } from './journeys';

export const journeyIndexes = () => {
  journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: 1 });
  journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: -1 });
  journeySchema.index({ departureStationName: 1, returnStationName: 1 });
  journeySchema.index({ departureStationName: 1, returnStationName: -1 });
  journeySchema.index({ coveredDistanceMeters: 1, departureStationName: 1 });
  journeySchema.index({
    departureStationName: 1,
    returnStationName: 1,
    coveredDistanceMeters: 1,
    durationSeconds: 1,
  });
};
