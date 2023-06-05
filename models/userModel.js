const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  userName: {
    type: String,
    requird: true,
  },
  email: {
    type: String,
    requird: true,
    unique: true,
  },
  password: {
    type: String,
    requird: true,
    selected: false,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Creator"],
    default: "User",
  },
});

userSchema.pre("save",async function() {
  if (this.isModified('password'))
    this.password = await bcrypt.hash(this.password , 11)
});

const User = mongoose.model("User", userSchema);
module.exports = User;
