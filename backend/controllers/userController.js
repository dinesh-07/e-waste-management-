const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')

// @desc    Register new user
// @route   POST /api/users
// @access  Public
const registerUser = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, company, phone, address, city, province, postalCode, type } = req.body

  if (!firstName || !lastName || !email ) {
    res.status(400)
    throw new Error('Please add all fields')
  }

  // Hash password
 // const salt = await bcrypt.genSalt(10)
 // const hashedPassword = await bcrypt.hash(password, salt)

  // Create user
  const user = await User.create({
    firstName,
    lastName,
    company,
    phoneNumber: phone,
    email,
    address,
    city,
    province,
    postalCode,
    type
  })

  if (user) {
    res.status(201).json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      phone: user.phoneNumber,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      type: user.type,
      email: user.email,
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})

// @desc    Authenticate a user
// @route   POST /api/users/login
// @access  Public
const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  // Check for user email
  const user = await User.findOne({ email })

  if (user && (await bcrypt.compare(password, user.password))) {
    res.json({
      _id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      company: user.company,
      phoneNumber: user.phoneNumber,
      address: user.address,
      city: user.city,
      province: user.province,
      postalCode: user.postalCode,
      email: user.email,
      token: generateToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid credentials')
  }
})

// @desc    Get user data
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
  res.status(200).json(req.user)
})

const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.status(201).json(users);
})

// Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}

module.exports = {
  registerUser,
  loginUser,
  getMe,
  getAllUsers
}
