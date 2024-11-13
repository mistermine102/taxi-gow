const jwt = require('jsonwebtoken')
const ejs = require("ejs")
const transporter = require("../emails/transporter")

const sendVerifyEmail = async () => {
  //generate url with token
  const baseUrl = 'https://569b-109-173-197-185.ngrok-free.app'
  const token = jwt.sign({ userId: newUser._id }, process.env.JWT_EMAIL_SECRET, { expiresIn: 1800 })
  const link = `${baseUrl}/user/verify/${token}`

  const template = await ejs.renderFile(path.join(__dirname, '..//templates/verificationEmail.ejs'), { verificationLink: link })

  //send a confirmation email
  await transporter.sendMail({
    from: 'Taxi Gow', // sender address
    to: newUser.email,
    subject: `Zweryfikuj swój adres email`, // Subject line
    html: template, // html body
  })
}

module.exports = sendVerifyEmail
