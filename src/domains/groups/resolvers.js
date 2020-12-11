const {
  getGroup,
  getGroups,
  createGroup,
  deleteGroup,
  addGroupMembers,
  setLeader,
  updateGroup,
} = require("./actions");
module.exports = {
  Query: {
    fetchGroup: async function (_, args) {
      try {
        const result = getGroup(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    fetchGroups: async function (_, args) {
      try {
        const results = getGroups(args);
        return results;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    addGroup: async (_, args) => {
      try {
        const results = await createGroup(args);
        return results;
      } catch (error) {
        return error;
      }
    },
    deleteGroup: async (_, args) => {
      try {
        const results = await deleteGroup(args);
        return results;
      } catch (err) {
        return err;
      }
    },
    addMembers: async (_, args) => {
      try {
        const results = await addGroupMembers(args);
        return results;
      } catch (err) {
        return err;
      }
    },
    setLeader: async (_, args) => {
      try {
        const results = await setLeader(args);
        return results;
      } catch (err) {
        return err;
      }
    },
    updateGroup: async (_, args) => {
      try {
        const results = await updateGroup(args);
        return results;
      } catch (e) {
        return e;
      }
    },
  },
};
