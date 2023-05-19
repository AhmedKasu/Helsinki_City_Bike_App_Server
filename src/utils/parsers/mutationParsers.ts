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

export const parseReturn = (time: { departure: string; return: string }) => {
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

export const parseJourneyArgs = (args: Journey) => {
  return {
    ...args,
    departure: parseDate(args.departure),
    return: parseReturn({ return: args.return, departure: args.departure }),
  };
};
