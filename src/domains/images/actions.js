const { imageModel } = require("./model");
const { memberModel } = require("../members/model");
const { AuthenticateToken } = require("../helpers/");

async function getImage({ ImageId }) {
  const doc = await imageModel
    .findOne({
      _id: ImageId,
    })
    .populate("member");
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

async function createImage({ input }, context) {
  try {
    const data = AuthenticateToken(context);
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
