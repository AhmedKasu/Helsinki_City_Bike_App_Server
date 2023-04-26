import { Schema, model } from 'mongoose';
import { Journey } from '../types';

const journeySchema = new Schema({}, { strict: false });
journeySchema.index({ coveredDistanceMeters: 1, durationSeconds: 1 });
journeySchema.index({ departureStationName: 1, returnStationName: 1 });
const Journey = model<Journey>('Journey', journeySchema, 'journeys');

export default Journey;
