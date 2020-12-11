const {
  getMember,
  getMembers,
  createMember,
  deleteMember,
  updateMember,
} = require("./actions");
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
    deleteMember: async (_, args) => {
      try {
        const results = await deleteMember(args);
        return results;
      } catch (err) {
        return err;
      }
    },
    updateMember: async (_, args) => {
      try {
        const results = await updateMember(args);
        return results;
      } catch (e) {
        return e;
      }
    },
  },
};
