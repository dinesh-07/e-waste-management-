const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, 'Please add a first name'],
    },
    lastName: {
      type: String,
      required: [true, 'Please add a last name'],
    },
    company: {
      type: String,
      required: [false, 'Please add a company name'],
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    phoneNumber: {
      type: String,
      required: [true, 'Please add a phone number'],
      unique: true,
    },
    city: {
      type: String,
      required: [false, 'Please add a city'],
    },
    address: {
      type: String,
      required: [false, 'Please add an address'],
    },
    province: {
      type: String,
      required: [false, 'Please add a province'],
    },
    postalCode: {
      type: String,
      required: [false, 'Please add a postal code'],
    },
    password: {
      type: String,
      required: [false, 'Please add a password'],
    },
    type: {
      type: String,
      required: [true, 'Please add a type'],
    },
  },
  {
    timestamps: true,
  }
)

module.exports = mongoose.model('User', userSchema)
