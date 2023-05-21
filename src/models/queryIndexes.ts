import { journeySchema } from './journeys';

// MongoDB queries are much faster with indexes.
//I have defined some text and compound default indexes for the most common queries.
export const journeyIndexes = () => {
  journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: 1 });
  journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: -1 });
  journeySchema.index({ departureStationName: 1, returnStationName: 1 });
  journeySchema.index({ departureStationName: 1, returnStationName: -1 });
  journeySchema.index({ coveredDistanceMeters: 1, departureStationName: 1 });
  journeySchema.index({ coveredDistanceMeters: -1 });
  journeySchema.index({ durationSeconds: -1 });
  journeySchema.index({
    departureStationName: 1,
    returnStationName: 1,
    coveredDistanceMeters: 1,
    durationSeconds: 1,
  });
};
