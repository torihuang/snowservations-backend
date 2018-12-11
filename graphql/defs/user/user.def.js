const userDef = `
  type User {
    _id: ObjectId!
    name: Name
    email: String
    token: String
    permissions: [String]
    createdAt: DateTime
    updatedAt: DateTime
    error: Error,
  }

  type Name {
    first: String
    last: String
  }

  type Error {
    key: String
    value: String
  }
`;

module.exports = userDef;
