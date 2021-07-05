/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: reactToMessage
// ====================================================

export interface reactToMessage_reactToMessage {
  __typename: "Reaction";
  uuid: string;
}

export interface reactToMessage {
  map: any;
  content: string;
  reactToMessage: reactToMessage_reactToMessage;
}

export interface reactToMessageVariables {
  uuid: string;
  content: string;
}
