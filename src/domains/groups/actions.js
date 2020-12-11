const { groupModel } = require("./model");
const { memberModel } = require("../members/model");

async function getGroup({ groupId }) {
  const doc = await groupModel
    .findOne({
      _id: groupId,
    })
    .populate("members leader");
  return doc;
}

async function getGroups({
  filter = {},
  order = "ascending",
  orderBy = "createdAt",
}) {
  const docs = await groupModel
    .find(filter)
    .sort({
      [orderBy]: order,
    })
    .populate("members leader");
  return docs;
}

async function createGroup({ input }) {
  const { name } = input;
  const alreadyCreated = await groupModel.findOne({ name: name });
  if (alreadyCreated) {
    return { group: null, msg: "Group Already Exist" };
  } else {
    try {
      const newGroup = new groupModel({
        ...input,
      });
      await newGroup.save();
      return { group: newGroup, msg: null };
    } catch (error) {
      return error;
    }
  }
}

async function deleteGroup({ input }) {
  const { groupId } = input;
  try {
    const doc = await groupModel.findByIdAndDelete(GroupId);
    return doc;
  } catch (err) {
    return err;
  }
}

async function addGroupMembers({ input }) {
  const { groupId, memberId } = input;
  const alreadyMember = await groupModel.findOne({
    members: memberId,
  });
  if (alreadyMember) {
    return { group: null, msg: "Already a member of another Group" };
  } else {
    const response = await groupModel.findOneAndUpdate(
      { _id: groupId },
      { $push: { members: memberId } },
      { upsert: true, new: true }
    );
    return { group: response, msg: null };
  }
}

async function setLeader({ input }) {
  const { memberId, groupId } = input;
  const response = await groupModel.findOneAndUpdate(
    { _id: groupId },
    { leader: memberId }
  );
  const data = { group: response, msg: null };
  return data;
}

async function updateGroup({ input }) {
  const { groupId, ...rest } = input;

  const response = await groupModel.findOneAndUpdate(
    { _id: groupId },
    { ...rest }
  );
  const data = { group: response, msg: null };
  return data;
}

module.exports = {
  getGroup,
  getGroups,
  createGroup,
  deleteGroup,
  addGroupMembers,
  setLeader,
  updateGroup,
};
