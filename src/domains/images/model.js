const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
  {
    url: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    member: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Member",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const imageModel = mongoose.model("Images", imageSchema);

module.exports = {
  imageModel,
};
