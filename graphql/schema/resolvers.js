const userDirective = require('../defs/user/user.directives');
const recordDirective = require('../defs/record/record.directives');
const scalars = require('../defs/scalars');

module.exports = {
  Query: {
    ...userDirective.queries,
    ...recordDirective.queries,
  },
  Mutation: {
    ...userDirective.mutations,
    ...recordDirective.mutations,
  },
  DateTime: scalars.dateTimeType,
  ObjectId: scalars.objectIdType,
};
