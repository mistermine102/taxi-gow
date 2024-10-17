const { parsePhoneNumberFromString } = require('libphonenumber-js')

module.exports = value => {
  const parsedPhoneNumber = parsePhoneNumberFromString(value)
  if (!parsedPhoneNumber || !parsedPhoneNumber.isValid()) throw new Error('Invalid phone number')
  return true
}
