/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: register
// ====================================================

export interface register_register {
  __typename: "User";
  username: string;
  email: string;
  createdAt: string;
}

export interface register {
  register: register_register;
}

export interface registerVariables {
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
}
