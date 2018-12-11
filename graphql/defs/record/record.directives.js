const Record = require('../../../models/record');
const Auth = require('../../../services/auth');
// Queries
const allRecords = async (root, data) => {
  try {
    return await Record.find();
  } catch (err) {
    throw new Error(err);
  }
};

const recordInfo = async (root, data) => {
  try {
    return await Record.findOne({ _id: data._id })
  } catch (err) {
    throw new Error(err);
  }
};

const newRecord = async (root, data) => {
  Auth.isValidUser(context);

  const userContext = context.user;
  if (!userContext || !userContext._id) throw new Error('Unauthorized');
  let userIdToUse = userContext._id;

  try {
    // Find user
    const user = await User.findOne({ _id: userIdToUse });
    const newRecordData = {
      observers: data.observers,
      location: {
        name: data.locationName,
        description: data.locationDescription,
      },
      conditions: {
        sky: data.conditionsSky,
        elevation: data.conditionsElevation,
        windSpeed: data.conditionsWindSpeed,
        windDirection: data.conditionsWindDirection,
        slopeAngle: data.conditionsSlopeAngle,
        airTemperature: data.conditionsAirTemperature,
      }
    }
    const record = new Record(newRecordData);

    // Add record to user
    if (!user.records) user.records = [];
    user.records.push(record);

    await Promise.all([
      record.save(),
      user.save()
    ]);

    return record;
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  queries: {
    allRecords,
    recordInfo,
  },
  mutations: {
    newRecord,
  },
};
