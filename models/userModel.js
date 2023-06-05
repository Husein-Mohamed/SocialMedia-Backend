const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

require("mongoose-type-url");

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
    type: mongoose.SchemaTypes.Url,
  },
  role: {
    type: String,
    enum: ["Admin", "User", "Creator"],
    default: "User",
  },
});

userSchema.pre("findOneAndUpdate", async function () {
  const modifiedField = this.getUpdate();
  if (modifiedField.$set.password)
    modifiedField.$set.password = await bcrypt.hash(
      modifiedField.$set.password,
      11
    );
});

userSchema.pre("save", async function () {
  if (this.isModified("password"))
    this.password = await bcrypt.hash(this.password, 11);
});

const User = mongoose.model("User", userSchema);
module.exports = User;
