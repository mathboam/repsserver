const { gql } = require("apollo-server-express");

module.exports = gql`
  type Group {
    _id: ID
    name: String
    members: [Member]
    leader: Member
    totalSteps: Int
    messages: [String]
    createdAt: Date
    updatedAt: Date
  }

  input addGroupInput {
    name: String!
    members: [ID]
    leader: ID
  }

  input fetchGroupInput {
    groupId: ID
  }

  input fetchGroupsInput {
    name: String!
    members: [ID]
    leader: ID
  }

  type GroupPayload {
    group: Group
    msg: String
    memberCount: Int
  }

  input deleteGroupInput {
    GroupId: ID
  }

  input addMembersInput {
    groupId: ID!
    memberId: ID
  }

  input updateGroup {
    memberId: ID
    groupId: ID!
    name: String
    leader: ID
    totalSteps: Int
    messages: String
  }

  extend type Query {
    fetchGroup(groupId: ID): Group
    fetchGroups(filter: fetchGroupsInput = {}): [Group]
  }

  extend type Mutation {
    addGroup(input: addGroupInput): GroupPayload
    deleteGroup(input: deleteGroupInput): GroupPayload
    addMembers(input: addMembersInput): GroupPayload
    setLeader(input: addMembersInput): GroupPayload
    updateGroup(input: updateGroup): GroupPayload
  }
`;
