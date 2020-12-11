const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Package {
    Stepping_Only
    Prepping_Only
    Stepping_Prepping
  }
  type Member {
    _id: ID
    name: String
    email: String
    age: Int
    dietRelatedIllness: String
    package: Package
    startWeight: Int
    contact: String
    steps: Int
    group: ID
    password: String
    images: [Image]
    profile: String
    createdAt: Date
    updatedAt: Date
  }
  input addMemberInput {
    name: String
    age: Int
    password: String
    email: String
    dietRelatedIllness: String
    package: Package
    startWeight: Int
    contact: String
    profile: String
  }
  input fetchMemberInput {
    memberId: ID
  }
  input fetchMembersInput {
    name: String
    password: String
    age: Int
    email: String
    dietRelatedIllness: String
    package: String
    contact: String
  }

  type addMemberPayload {
    member: Member
    msg: String
  }

  input deleteMemberInput {
    memberId: ID
  }

  input updateMemberInput {
    name: String
    email: String
    age: Int
    dietRelatedIllness: String
    package: Package
    group: ID
    startWeight: Int
    contact: String
    steps: Int
    profile: String
  }

  extend type Query {
    fetchMember(memberId: ID): Member
    fetchMembers(filter: fetchMembersInput = {}): [Member]
  }
  extend type Mutation {
    addMember(input: addMemberInput): addMemberPayload
    deleteMember(input: deleteMemberInput): Member
    updateMember(input: updateMemberInput): Member
  }
`;
