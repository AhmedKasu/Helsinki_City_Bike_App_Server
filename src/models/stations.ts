import { Schema, model } from 'mongoose';
import { Station } from '../types';

const requiredNumber = { type: Number, required: true };
const requiredString = { type: String, required: true };

const stationSchema = new Schema({
  fId: requiredNumber,
  id: requiredNumber,
  nimi: requiredString,
  namn: requiredString,
  name: requiredString,
  osoite: requiredString,
  adress: requiredString,
  kaupunki: requiredString,
  stad: requiredString,
  operaattor: requiredString,
  kapasiteet: requiredNumber,
  x: requiredNumber,
  y: requiredNumber,
});

const Station = model<Station>('Station', stationSchema, 'stations');

export default Station;
