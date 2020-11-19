const { paymentModel } = require("./model");
const { makePayment } = require("../../payment/index");
async function getPayment({ paymentId }) {
  return await paymentModel.find({
    _id: paymentId,
  });
}

async function createPayment({ input }) {
  // try {
  //   const newPayment = new paymentModel({
  //     ...input,
  //   });
  //   await newPayment.save();
  //   return { payment: newPayment };
  // } catch (error) {
  //   return error;
  // }
  makePayment(input);
}

module.exports = {
  createPayment,
  getPayment,
};
