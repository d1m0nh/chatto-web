/**
 * @flow
 */

"use strict";

import {
  Action,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_SUCCESS
} from "../actions/types";

import { User } from "../types";

export type State = {
  isLoggedIn: boolean,
  username: string
};

const initialState = {
  isLoggedIn: false,
  username: ""
};

/** Reducer **/
function auth(state: State = initialState, action: Action): State {
  switch (action.type) {
    case AUTH_SIGNIN_SUCCESS:
      return {
        isLoggedIn: true,
        username: action.auth.user.username
      };
    case AUTH_SIGNIN_FAIL:
      return {
        ...initialState
      };
    default:
      return state;
  }
}

/** Exports **/
module.exports = auth;
