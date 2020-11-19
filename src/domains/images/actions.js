const { imageModel } = require("./model");
const { memberModel } = require("../members/model");

async function getImage({ ImageId }) {
  const doc = await imageModel
    .findOne({
      _id: ImageId,
    })
    .populate("members");
  return doc;
}

async function getImages({
  filter = {},
  order = "descending",
  orderBy = "createdAt",
}) {
  const docs = await imageModel
    .find(filter)
    .sort({
      [orderBy]: order,
    })
    .populate("member");
  return docs;
}

async function createImage({ input }) {
  try {
    const newImage = new imageModel({
      ...input,
    });
    await newImage.save();
    return { image: newImage };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getImage,
  getImages,
  createImage,
};
