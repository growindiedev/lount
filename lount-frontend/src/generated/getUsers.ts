/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_getUsers {
  __typename: "User";
  username: string;
  email: string;
  createdAt: string;
}

export interface getUsers {
  getUsers: (getUsers_getUsers | null)[];
}
