import { Default } from '../types';

interface Args {
  nimi: string;
  month: number;
}

export const stationAggregate = ({ nimi, month }: Args) => {
  // bypassing Octal literals  error
  const validMonth = month < 10 ? `${0}${month}` : `${month}`;

  return [
    { $match: { nimi } },
    {
      $lookup: {
        from: 'journeys',
        as: 'journeysStarting',
        let: { id: '$id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$departureStationId', '$$id'] },
                  {
                    $gte: [
                      '$departure',
                      new Date(`${Default.Year}-${validMonth}-01`),
                    ],
                  },
                  {
                    $lte: [
                      '$departure',
                      new Date(`${Default.Year}-${validMonth}-31`),
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    },
    {
      $lookup: {
        from: 'journeys',
        as: 'journeysEnding',
        let: { id: '$id' },
        pipeline: [
          {
            $match: {
              $expr: {
                $and: [
                  { $eq: ['$returnStationId', '$$id'] },
                  {
                    $gte: [
                      '$departure',
                      new Date(`${Default.Year}-${validMonth}-01`),
                    ],
                  },
                  {
                    $lte: [
                      '$departure',
                      new Date(`${Default.Year}-${validMonth}-31`),
                    ],
                  },
                ],
              },
            },
          },
        ],
      },
    },
  ];
};
