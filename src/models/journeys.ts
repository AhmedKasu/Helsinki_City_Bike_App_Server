import { Schema, model } from 'mongoose';
import { Journey } from '../types';

const journeySchema = new Schema({}, { strict: false });

const Journey = model<Journey>('Journey', journeySchema, 'journeys');

export default Journey;
