import { GraphQLError } from 'graphql';
import { Journey } from '../../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

export const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new GraphQLError('Incorrect or missing date: ' + date, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return date;
};

export const parseJourneyArgs = (args: Journey) => {
  return {
    ...args,
    departure: parseDate(args.departure),
    return: parseDate(args.return),
  };
};
