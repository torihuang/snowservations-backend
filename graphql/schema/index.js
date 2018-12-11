const { makeExecutableSchema } = require('graphql-tools');

const resolvers = require('./resolvers.js');
const userDefs = require('../defs/user/user.def.js');
const recordDefs = require('../defs/record/record.def.js');

const typeDefs = `
  ${userDefs}
  ${recordDefs}
  type Query {
    userInfo: User!
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
    newUser(email: String!, firstName: String!, lastName: String!, password: String!): User
  }
`;
// signUpAdmin(adminSignupCode: String!, email: String!, firstName: String!, lastName: String!, password: String!): User

// Generate the schema object from your types definition.
module.exports = makeExecutableSchema({typeDefs, resolvers});
