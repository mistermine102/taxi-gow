const jwt = require('jsonwebtoken')
const ejs = require('ejs')
const path = require('path')
const transporter = require('../emails/transporter')

const sendVerifyEmail = async (user) => {
  //generate url with token
  const baseUrl = 'https://591a-109-173-197-185.ngrok-free.app'
  const token = jwt.sign({ userId: user._id }, process.env.JWT_EMAIL_SECRET, {
    expiresIn: 1800,
  })
  const link = `${baseUrl}/user/verify/${token}`

  const template = await ejs.renderFile(
    path.join(__dirname, '..//templates/verificationEmail.ejs'),
    { verificationLink: link }
  )

  //send a confirmation email
  await transporter.sendMail({
    from: 'Taxi Gow', // sender address
    to: user.email,
    subject: `Zweryfikuj swój adres email`, // Subject line
    html: template, // html body
  })
}

module.exports = sendVerifyEmail
