import { GraphQLError } from 'graphql';
import { Default, Journey } from '../../types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string';
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!date || !isString(date) || !isDate(date)) {
    throw new GraphQLError('Incorrect or missing date: ' + date, {
      extensions: { code: 'BAD_USER_INPUT' },
    });
  }

  return date;
};

const parseReturn = (time: { departure: string; return: string }) => {
  const parserdReturn = parseDate(time.return);
  if (
    new Date(parserdReturn).getTime() - new Date(time.departure).getTime() <
    0
  )
    throw new GraphQLError(
      'Return date can not be before departure: ' + parserdReturn,
      {
        extensions: { code: 'BAD_USER_INPUT' },
      }
    );
  return parserdReturn;
};

const parseDistace = (value: number) => {
  if (!value || value < Default.DistanceDurration)
    throw new GraphQLError(
      'Invalid value distance must be greater or equal to 10: ' + value,
      {
        extensions: { code: 'BAD_USER_INPUT' },
      }
    );
  return value;
};

const parseDuration = (time: { departure: string; return: string }) => {
  return (
    (new Date(time.return).getTime() - new Date(time.departure).getTime()) *
    0.001
  );
};

export const parseJourneyArgs = (args: Journey) => {
  const time = { return: args.return, departure: args.departure };
  return {
    ...args,
    departure: parseDate(args.departure),
    return: parseReturn(time),
    coveredDistanceMeters: parseDistace(args.coveredDistanceMeters),
    durationSeconds: parseDuration(time),
  };
};
