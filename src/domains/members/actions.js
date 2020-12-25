const { memberModel } = require("./model");
const { imageModel } = require("../images/model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function getMember({ memberId }) {
  const doc = await memberModel
    .findOne({
      _id: memberId,
    })
    .populate("images");
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

async function loginMember({ input }) {
  const { email, password } = input;
  try {
    //  authentication
    const member = await memberModel.findOne({ email: email });
    if (!member) {
      const response = {
        token: null,
        msg: "The email provided doesn't seem to be registered",
      };
      return response;
    } else {
      const checker = await bcrypt.compare(password, member.password);
      if (checker) {
        //  generating  token
        const serializer = { ...member };
        const accessToken = jwt.sign(
          serializer,
          process.env.ACCESS_TOKEN_SECRET
        );

        const response = { token: accessToken, msg: null };
        return response;
      } else {
        const response = { token: null, msg: "password provided is incorrect" };
        return response;
      }
    }
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
  loginMember,
};
