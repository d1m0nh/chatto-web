/**
 * @flow
 */

"use strict";

import type { State as AuthState } from "../reducers/auth";

export type ApplicationState = {
  messages: Array<Message>,
  auth: AuthState
};

export type AuthResponse = {
  success: boolean,
  user: ?User,
  error: ?string
};

export type User = {
  id: number,
  username: string
};

export type Message = {
  id: number,
  text: string,
  username: string
};
