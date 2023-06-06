const mongoose = require("mongoose");
const { Schema } = mongoose;

const postSchema = new Schema({
  title: {
    type: String,
  },
  publishDate: {
    type: Date,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

postSchema.pre("updateOne", async function () {
  const modifiedField = this.getUpdate();
  console.log(this);
});

const Post = mongoose.model("Post", postSchema);
module.exports = Post;
