const { memberModel } = require("./model");

async function getMember({ memberId }) {
  console.log(memberId);
  const doc = await memberModel
    .findOne({
      _id: memberId,
    })
    .populate("images");
  console.log(doc);
  return doc;
}

async function getMembers({
  filter = {},
  order = "ascending",
  orderBy = "createdAt",
}) {
  const docs = await memberModel
    .find(filter)
    .sort({
      [orderBy]: order,
    })
    .populate("payment");
  return docs;
}

async function createMember({ input }) {
  try {
    const newMember = new memberModel({
      ...input,
    });
    await newMember.save();
    return { member: newMember };
  } catch (error) {
    return error;
  }
}

module.exports = {
  getMember,
  getMembers,
  createMember,
};
