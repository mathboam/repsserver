const { getMember, getMembers, createMember } = require("./actions");
module.exports = {
  Query: {
    fetchMember: async function (_, args) {
      try {
        const result = getMember(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    fetchMembers: async function (_, args) {
      try {
        const results = getMembers(args);
        return results;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    addMember: async (_, args) => {
      try {
        const results = await createMember(args);
        return results;
      } catch (error) {
        return error;
      }
    },
  },
};
