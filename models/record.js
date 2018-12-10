const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const recordSchema = new Schema({
  observers: [String],
  location: {
    name: String,
    description: String,
  },
  conditions: {
    sky: String,
    elevation: Number,
    windSpeed: Number,
    windDirection: String,
    slopeAngle: Number,
    airTemperature: Number,
  },
  createdAt: { type: 'Date' },
  updatedAt: { type: 'Date' },
});

recordSchema.pre('save', function preSave(next) {
  if (!this.createdAt) this.createdAt = Date.now();
  this.updatedAt = Date.now();
  next();
});

module.exports = mongoose.model('Record', recordSchema);
