const { getImage, getImages, createImage } = require("./actions");
module.exports = {
  Query: {
    fetchImage: async function (_, args) {
      try {
        const result = getImage(args);
        return result;
      } catch (err) {
        return err;
      }
    },
    fetchImages: async function (_, args) {
      try {
        const results = getImages(args);
        return results;
      } catch (err) {
        return err;
      }
    },
  },
  Mutation: {
    addImage: async (_, args, context) => {
      try {
        const results = await createImage(args, context);
        return results;
      } catch (error) {
        return error;
      }
    },
  },
};
