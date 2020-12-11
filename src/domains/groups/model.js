const mongoose = require("mongoose");

const groupSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    leader: {
      type: mongoose.SchemaTypes.ObjectId,
      ref: "Member",
    },
    members: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Member",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const groupModel = mongoose.model("Group", groupSchema);
module.exports = {
  groupModel,
};
