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
    age: Int
    dietRelatedIllness: String
    package: Package
    images: [Image]
    startWeight: Int
    contact: String
    createdAt: Date
    updatedAt: Date
  }
  input addMemberInput {
    name: String
    age: Int
    dietRelatedIllness: String
    package: Package
    startWeight: Int
    contact: String
  }
  input fetchMemberInput {
    memberId: ID
  }
  input fetchMembersInput {
    name: String
    age: Int
    dietRelatedIllness: String
    package: String
    images: [String]
    contact: String
  }

  type addMemberPayload {
    member: Member!
  }

  extend type Query {
    fetchMember(memberId: ID): Member
    fetchMembers(filter: fetchMembersInput = {}): [Member]
  }
  extend type Mutation {
    addMember(input: addMemberInput): addMemberPayload
  }
`;
