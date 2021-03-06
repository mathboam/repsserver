const mongoose = require("mongoose");

const memberSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    dietRelatedIllness: {
      type: String,
      required: false,
    },
    contact: {
      type: String,
      required: true,
    },
    package: {
      type: String,
      required: true,
    },
    startWeight: {
      type: Number,
      required: true,
    },
    profile: {
      type: String,
      required: true,
    },
    // payment: { type: String, required: true },
    // payment: [
    //   {
    //     type: mongoose.SchemaTypes.ObjectId,
    //     ref: "Payment",
    //     required: true,
    //   },
    // ],
    group: {
      type: mongoose.SchemaTypes.ObjectId,
    },
    images: [
      {
        type: mongoose.SchemaTypes.ObjectId,
        ref: "Images",
        required: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const memberModel = mongoose.model("Member", memberSchema);
module.exports = {
  memberModel,
};
