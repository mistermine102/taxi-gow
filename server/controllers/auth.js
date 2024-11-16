const AppError = require('../classes/AppError')
const mongoose = require('mongoose')
const User = mongoose.model('User')
const UnconfirmedUser = mongoose.model('UnconfirmedUser')
const Route = mongoose.model('Route')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const sendVerifyEmail = require('../utils/sendVerifyEmail')

exports.signup = async (req, res) => {
  const { email, password, phoneNumber } = req.body

  // Check if the email is available
  const user = await User.findOne({ email })
  if (user) throw new AppError('Email already in use', 400)

  //check if there is an unconfirmed user with that email
  const unconfirmedUser = await UnconfirmedUser.findOne({ email })
  if (unconfirmedUser) throw new AppError('USER_NOT_VERIFIED', 400)

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 12)

  // Create an unconfirmed user
  const newUser = new UnconfirmedUser({
    email,
    password: hashedPassword,
    phoneNumber,
    name: '',
    activeRoute: null,
    routes: [],
    roles: ['client'],
  })
  await newUser.save()

  await sendVerifyEmail(newUser.email)

  res.json({ message: `Verification email was sent to ${newUser.email}` })
}

exports.signin = async (req, res) => {
  const { email, password } = req.body

  //check if user exists but is unverified
  const unconfirmedUser = await UnconfirmedUser.findOne({ email })
  if (unconfirmedUser) throw new AppError('USER_NOT_VERIFIED', 400)

  //find user by email
  const user = await User.findOne({ email })
  if (!user) throw new AppError('INVALID_CREDENTIALS', 400)

  //check password
  const isPasswordCorrect = await bcrypt.compare(password, user.password)
  if (!isPasswordCorrect) throw new AppError('INVALID_CREDENTIALS', 400)

  //create token
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET)

  //transform user (strip unnecessary information like password etc)
  const transformedUser = user.transform()
  transformedUser.activeRoute = await Route.findById(transformedUser.activeRoute)

  res.json({
    token,
    user: transformedUser,
  })
}

exports.getUser = async (req, res) => {
  const transformedUser = req.user.transform()
  transformedUser.activeRoute = await Route.findById(transformedUser.activeRoute)

  res.json({
    user: transformedUser,
  })
}

exports.verifyUser = async (req, res) => {
  try {
    const { token } = req.params
    const { email } = jwt.verify(token, process.env.JWT_EMAIL_SECRET)

    const unconfirmedUser = await UnconfirmedUser.findOne({ email })
    const newUser = new User({ ...unconfirmedUser._doc })

    await newUser.save()
    await unconfirmedUser.deleteOne()

    res.send('Zweryfikowano')
  } catch (err) {
    console.log(err)
    if (err.name === 'TokenExpiredError') {
      return res.send('Minał czas ważności linku')
    }
    res.send('Coś poszło nie tak przy weryfikacji konta. Spróbuj zarejestrować się ponownie')
  }
}

exports.sendVerifyEmail = async (req, res) => {
  //find the user that tried to signin
  const { email } = req.body
  await sendVerifyEmail(email)

  res.json({ message: 'Verification email sent' })
}
