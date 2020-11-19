const { gql } = require("apollo-server-express");

module.exports = gql`
  enum Category {
    weights
    steps
  }

  type Image {
    url: String
    category: Category
    member: Member
    createdAt: Date
    updatedAt: Date
  }

  input fetchImageInput {
    memberId: ID
  }

  input fetchImagesInput {
    url: String
    category: String
    member: String
  }

  input addImageInput {
    url: String
    category: Category
    member: ID
  }

  type addImagePayload {
    image: Image
  }

  extend type Query {
    fetchImages(filter: fetchImagesInput = {}): [Image]
    fetchImage(filter: fetchImageInput = {}): Image
  }
  extend type Mutation {
    addImage(input: addImageInput): addImagePayload
  }
`;
