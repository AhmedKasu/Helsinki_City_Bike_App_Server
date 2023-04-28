import { Schema, model } from 'mongoose';
import { Journey } from '../types';
import { journeyIndexes } from './queryIndexes';

const requiredNumber = { type: Number, required: true };
const requiredString = { type: String, required: true };

export const journeySchema = new Schema({
  departure: requiredString,
  return: requiredString,
  departureStationId: requiredNumber,
  departureStationName: requiredString,
  returnStationName: requiredString,
  returnStationId: requiredNumber,
  coveredDistanceMeters: requiredNumber,
  durationSeconds: requiredNumber,
});

journeyIndexes();

const Journey = model<Journey>('Journey', journeySchema, 'journeys');

export default Journey;
