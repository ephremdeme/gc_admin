import gql from "graphql-tag";

export const GET_ALL_PRODUCTS = gql`
  {
    products {
      id
      name
      quantity
      description
      price
      category {
        id
        category
      }
      subCategory {
        id
        category
      }
    }
  }
`;

export const GET_ALL_CATEGORIES = gql`
  {
    categories {
      id
      category
      SubCategory {
        id
        category
      }
    }
  }
`;

export const DELETE_PRODUCT = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation updateProduct(
    $id: Int!
    $name: String!
    $price: Float!
    $quantity: Int!
    $description: String!
    $categoryId: Int!
    $subCategoryId: Int!
    $file_3d: Upload
    $images: [Upload]
  ) {
    updateProduct(
      id: $id
      name: $name
      price: $price
      quantity: $quantity
      description: $description
      categoryId: $categoryId
      subCategoryId: $subCategoryId
      images: $images
      file_3d: $file_3d
    ) {
      id
      name
      price
      quantity
      description
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation createProduct(
    $name: String!
    $price: Float!
    $quantity: Int!
    $file_3d: Upload!
    $images: [Upload!]!
    $description: String!
    $categoryId: Int!
    $subCategoryId: Int!
  ) {
    createProduct(
      name: $name
      price: $price
      quantity: $quantity
      images: $images
      file_3d: $file_3d
      description: $description
      categoryId: $categoryId
      subCategoryId: $subCategoryId
    ) {
      id
      name
      price
      quantity
      description
    }
  }
`;
