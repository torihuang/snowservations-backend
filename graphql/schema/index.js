const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers.js');
const recordDefs = require('../defs/record/record.def.js');

const typeDefs = `
  ${recordDefs}
  type Query {
    recordInfo(_id: String!): Record!
    allRecords: [Record]!
  }

  type Mutation {
    newRecord(
      observers:[String]!,
      locationName:String!,
      locationDescription:String!,
      conditionsSky: String,
      conditionsElevation: Int,
      conditionsWindSpeed: Int,
      conditionsWindDirection: String,
      conditionsSlopeAngle: Int,
      conditionsAirTemperature: Int,
    ): Record!
  }
`;
// signUpAdmin(adminSignupCode: String!, email: String!, firstName: String!, lastName: String!, password: String!): User

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});
