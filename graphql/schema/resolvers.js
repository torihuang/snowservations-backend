const recordDirective = require('../defs/record/record.directives');
const scalars = require('../defs/scalars');

module.exports = {
  Query: {
    ...recordDirective.queries,
  },
  Mutation: {
    ...recordDirective.mutations,
  },
  DateTime: {
    ...scalars.dateTimeType,
    ...scalars.objectIdType
  },
};
