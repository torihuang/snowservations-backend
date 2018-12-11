const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const User = require('../../../models/user');
const serverConfig = require('../../../config.js');

// Services
const getEmptyUser = () => {
  return {
    _id: '',
    email: '',
    name: {
      first: '',
      last: '',
    },
  };
};

function returnEmptyUserWithError(error) {
  const emptyUser = getEmptyUser();
  emptyUser.error = error;
  return emptyUser;
}

function makeSalt() {
  const byteSize = 16;
  return crypto.randomBytes(byteSize).toString('base64');
}

function encryptPassword(password, passedSalt) {
  if (!password || !passedSalt) {
    return { error: 'Missing password or salt' };
  }

  const defaultIterations = 10000;
  const defaultKeyLength = 64;
  const digest = 'sha512';
  const salt = new Buffer(passedSalt, 'base64');

  return crypto.pbkdf2Sync(password, salt, defaultIterations, defaultKeyLength, digest)
               .toString('base64');
}

function getSignedToken(user, data) {
  const userToSignToken = {
    _id: user._id,
    name: user.name,
    email: user.email,
    permissions: user.permissions,
    createdOn: new Date().toString(),
  };

  // Token expires every 8 days, must be >7 or need to change Lambda function managing token
  const expirationDate = 60 * 60 * 24 * 8;
  // if (user.permissions.indexOf('admin') >= 0) expirationDate = 60 * 60 * 12;
  return jwt.sign(userToSignToken, serverConfig.secretKey, { expiresIn: expirationDate });
}

// Queries
const userInfo = async (root, data) => {
  try {
    return await User.findOne({ _id: data._id })
  } catch (err) {
    throw new Error(err);
  }
};

const newUser = async (root, data) => {
  try {
    const userToSigninRegex = new RegExp(`^${data.email.toLowerCase()}$`, 'i');
    const foundUser = await User.findOne({ email: userToSigninRegex });
    // User already exists with that email, cannot signup
    if (foundUser) {
      return returnEmptyUserWithError({
        key: 'USER_EXISTS',
        value: 'User already exists with that email',
      });
    }

    // User does not exist with that email, user can signup
    const salt = makeSalt();
    const newUser = new User({
      email: data.email,
      name: {
        first: data.firstName || '',
        last: data.lastName || '',
      },
      salt,
      passwordHash: encryptPassword(data.password, salt),
      lastLogin: new Date(),
    });

    // Save new user
    const savedUser = await newUser.save();

    // Return new user with token attached
    savedUser.token = getSignedToken(savedUser, data);
    savedUser.permissionsAsString = savedUser.permissions.join(', ');

    savedUser.passwordHash = undefined;
    savedUser.salt = undefined;
    return savedUser;
  } catch (err) {
    console.log('Error signing up user', err);
    return err;
  }
};

module.exports = {
  queries: {
    userInfo,
  },
  mutations: {
    newUser,
  },
};
