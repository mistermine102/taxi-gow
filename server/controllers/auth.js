const AppError = require('../classes/AppError')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

exports.signup = async (req, res) => {
  const { email, password } = req.body

  //check if email is available
  const user = await User.findOne({ email })
  if (user) throw new AppError('Email already in use', 400)

  //hash password
  const hashedPassword = await bcrypt.hash(password, 12)

  //create user
  const newUser = new User({
    email,
    password: hashedPassword,
    role: 'client',
  })
  await newUser.save()

  //create token
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET)

  //transform user (strip unnecessary information like password etc)
  const transformedUser = newUser.transform()

  res.json({
    token,
    user: transformedUser,
  })
}

exports.signin = async (req, res) => {
  const { email, password } = req.body

  //find user by email
  const user = await User.findOne({ email })
  if (!user) throw new AppError('Invalid email or password', 400)

  //check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw new AppError('Invalid email or password', 400)

  //create token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

  //transform user (strip unnecessary information like password etc)
  const transformedUser = user.transform()

  res.json({
    token,
    user: transformedUser,
  })
}

exports.getUser = (req, res) => {
  const transformedUser = req.user.transform()

  res.json({
    user: transformedUser,
  })
}
