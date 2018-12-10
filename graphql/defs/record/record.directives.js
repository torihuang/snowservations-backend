const Record = require('../../../models/record');

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
  try {
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
    return await record.save();
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
