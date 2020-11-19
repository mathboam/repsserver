const { getPayment, createPayment } = require("./actions");
module.exports = {
  Query: {
    fetchPayment: async (_, args) => {
      try {
        return await getPayment(args);
      } catch (e) {
        return e;
      }
    },
  },
  Mutation: {
    addPayment: async (_, args) => {
      try {
        return await createPayment(args);
      } catch (e) {
        return e;
      }
    },
  },
};
