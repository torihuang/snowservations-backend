const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const crypto = require('crypto');

const userSchema = new Schema({
  email: {
    type: String,
    lowercase: true,
    unique: true,
    sparse: true,
  },
  name: {
    first: String,
    last: String,
  },
  passwordHash: {
    type: String,
  },
  salt: {
    type: String,
  },
  permissions: [String],
  lastLogin: { type: Date },
  createdAt: { type: 'Date' },
  updatedAt: { type: 'Date' },
});

userSchema.pre('save', function preSave(next) {
  if (!this.createdAt) this.createdAt = Date.now();
  this.updatedAt = Date.now();
  next();
});

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

userSchema.methods = {
  isValidPassword(password) {
    const encryptedPassword = encryptPassword(password, this.salt);
    return encryptedPassword === this.passwordHash;
  },
};

module.exports = mongoose.model('User', userSchema);
