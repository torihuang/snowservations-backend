const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { ObjectId, ObjectID } = require('mongodb')

// Scalars
const objectIdType = new GraphQLScalarType({
  name: 'ObjectId',
  description: 'The `ObjectId` scalar type represents a [`BSON`](https://en.wikipedia.org/wiki/BSON) ID commonly used in `mongodb`.',
  serialize (_id) {
    if (_id instanceof ObjectId) {
      return _id.toHexString()
    } else if (typeof _id === 'string') {
      return _id
    } else {
      throw new Error(`${Object.getPrototypeOf(_id).constructor.name} not convertible to `)
    }
  },
  parseValue (_id) {
    if (typeof _id === 'string') {
      return ObjectId.createFromHexString(_id)
    } else {
      throw new Error(`${typeof _id} not convertible to ObjectId`)
    }
  },
  parseLiteral (ast) {
    if (ast.kind === Kind.STRING) {
      return ObjectId.createFromHexString(ast.value)
    } else {
      throw new Error(`${ast.kind} not convertible to ObjectId`)
    }
  },
});
const dateTimeType = new GraphQLScalarType({
  name: 'DateTime',
  description: 'Formats date and time for Date fields',
  parseValue(value) {
    return new Date(value); // value from the client
  },
  serialize(value) {
    return value.getTime(); // value sent to the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.INT) {
      return parseInt(ast.value, 10); // ast value is always in string format
    }
    return null;
  },
});

module.exports = {
  dateTimeType,
  objectIdType,
};
