const { memberModel } = require("./model");
const { imageModel } = require("../images/model");
const bcrypt = require("bcrypt");

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
  const { password, email, ...rest } = input;
  const alreadyMember = await memberModel.findOne({ email: email });
  if (alreadyMember) {
    return { member: null, msg: "The email entered is already a member" };
  } else {
    const saltRounds = 10;
    try {
      let hash = await bcrypt.hash(password, saltRounds);

      const hashedPass = hash;
      const details = { ...rest, email: email, password: hashedPass };
      const newMember = new memberModel(details);
      await newMember.save();
      const response = { member: newMember, msg: null };
      return response;
    } catch (error) {
      return error;
    }
  }
}

async function deleteMember({ input }) {
  const { memberId } = input;
  try {
    const doc = await memberModel.findByIdAndDelete(memberId);
    const docs = await imageModel.deleteMany({ member: memberId });
    return doc;
  } catch (err) {
    return err;
  }
}

async function updateMember({ input }) {
  const { memberId, ...rest } = input;
  try {
    const doc = await memberModel.findOneAndUpdate(
      { _id: memberId },
      { ...rest }
    );
  } catch (e) {
    return e;
  }
}

module.exports = {
  getMember,
  getMembers,
  createMember,
  deleteMember,
  updateMember,
};
