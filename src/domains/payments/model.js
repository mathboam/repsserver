const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema(
  {
    amount: {
      type: Number,
      required: true,
    },
    transactionId: {
      type: String,
      required: true,
    },
    from: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const paymentModel = mongoose.model("Payment", paymentSchema);
module.exports = {
  paymentModel,
};
