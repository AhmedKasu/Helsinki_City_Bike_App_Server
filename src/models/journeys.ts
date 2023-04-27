import { Schema, model } from 'mongoose';
import { Journey } from '../types';

const journeySchema = new Schema({
  departure: { type: String, required: true },
  return: { type: String, required: true },
  departureStationId: { type: Number, required: true },
  departureStationName: { type: String, required: true },
  returnStationName: { type: String, required: true },
  returnStationId: { type: Number, required: true },
  coveredDistanceMeters: { type: Number, required: true },
  durationSeconds: { type: Number, required: true },
});

journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: 1 });
journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: -1 });
journeySchema.index({ departureStationName: 1, returnStationName: 1 });
journeySchema.index({ departureStationName: 1, returnStationName: -1 });

journeySchema.index({
  departureStationName: 1,
  returnStationName: 1,
  coveredDistanceMeters: 1,
  durationSeconds: 1,
});
journeySchema.index({ coveredDistanceMeters: 1, departureStationName: 1 });

const Journey = model<Journey>('Journey', journeySchema, 'journeys');

export default Journey;
