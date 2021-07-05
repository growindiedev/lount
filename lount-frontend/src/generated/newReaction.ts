/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL subscription operation: newReaction
// ====================================================

export interface newReaction_newReaction_message {
  __typename: "Message";
  uuid: string;
  from: string;
  to: string;
}

export interface newReaction_newReaction {
  __typename: "Reaction";
  uuid: string;
  content: string;
  message: newReaction_newReaction_message;
}

export interface newReaction {
  newReaction: newReaction_newReaction;
}
