const recordDef = `
  scalar ObjectId
  scalar DateTime

  type Record {
    _id: ObjectId!
    observers: [String]
    location: RecordLocation
    conditions: RecordConditions,
    createdAt: DateTime,
    updatedAt: DateTime,
  }

  type RecordLocation {
    name: String
    location: String
  }

  type RecordConditions {
    sky: String
    elevation: Int
    windSpeed: String
    windDirection: String
    slopeAngle: Int
    airTemperature: Int
  }
`;

module.exports = recordDef;
