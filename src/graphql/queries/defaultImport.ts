import Journey from '../../models/journeys';

const defautImport = async () => {
  const query = {
    $or: [
      { coveredDistanceMeters: { $lt: 10 } },
      { durationSeconds: { $lt: 10 } },
    ],
  };

  const deletedJourneys = await Journey.deleteMany(query);
  console.log('journeys deleted', deletedJourneys);
};

export default defautImport;
