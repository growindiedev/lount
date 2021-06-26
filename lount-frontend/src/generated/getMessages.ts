/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: getMessages
// ====================================================

export interface getMessages_getMessages {
  __typename: "Message";
  uuid: string;
  from: string;
  to: string;
  content: string;
  createdAt: string;
}

export interface getMessages {
  getMessages: (getMessages_getMessages | null)[];
}

export interface getMessagesVariables {
  from: string;
}
