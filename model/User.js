const mongoose = require("mongoose");

const Schema = mongoose.Schema;
const userSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  roles: {
    User: { type: Number, default: 1 },
    Admin: { type: Number },
  },
  password: {
    required: true,
    type: String,
  },
  refreshToken: String,
});

module.exports = mongoose.model("User", userSchema);
