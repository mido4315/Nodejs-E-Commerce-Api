const mongoose = require("mongoose");

const { PhoneNumberUtil, PhoneNumberFormat } = require("google-libphonenumber");
// Define the user schema
const userSchema = mongoose.Schema({
  name: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
      validator: (email) => {
        // Regular expression for email validation
        const emailRegex =
          /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
        return emailRegex.test(email);
      },
      message: (props) => `${props.value} is not a valid email address.`,
    },
  },
  password: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
    trim: true,
  },
  phoneNumber: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: function (phoneNumber) {
        const phoneUtil = PhoneNumberUtil.getInstance();
        try {
          const parsedNumber = phoneUtil.parse(phoneNumber, "ZZ"); // 'ZZ' represents an unknown region
          return phoneUtil.isValidNumber(parsedNumber);
        } catch (error) {
          return false;
        }
      },
      message: (props) => `${props.value} is not a valid phone number.`,
    },
  },
  type: {
    type: String,
    default: "user",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create the user model
const User = mongoose.model("User", userSchema);

// Export the user model
module.exports = User;
