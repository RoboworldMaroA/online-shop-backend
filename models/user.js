const mongoose = require("mongoose");

require("dotenv").config();

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, minlength: 3, maxlength: 30 },
  email: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 200,
    unique: true,
  },
  password: { type: String, required: true, minlength: 3, maxlength: 1024 },
});

const User = mongoose.model("User", userSchema);

//By exporting user allows us to use in the different components
exports.User = User;
