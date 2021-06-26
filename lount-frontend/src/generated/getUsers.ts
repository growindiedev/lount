/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getUsers
// ====================================================

export interface getUsers_getUsers_latestMessage {
  __typename: "Message";
  uuid: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
}

export interface getUsers_getUsers {
  __typename: "User";
  username: string;
  createdAt: string;
  token: string | null;
  imageUrl: string;
  latestMessage: getUsers_getUsers_latestMessage | null;
}

export interface getUsers {
  getUsers: (getUsers_getUsers | null)[];
}
