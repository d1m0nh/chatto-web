/**
 * @flow
 */

"use strict";

import {
  Action,
  ThunkAction,
  AUTH_SIGNIN_REQUEST,
  AUTH_SIGNIN_FAIL,
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT_SUCCESS
} from "./types";

import { login as loginRequest } from "../api";
import { User } from "../types";

function login(username: string): ThunkAction {
  return async dispatch => {
    dispatch(loginStarted());
    try {
      let user = await loginRequest(username);
      dispatch(loginSuccess(user));
    } catch (err) {
      dispatch(loginFailed(err));
    }
  };
}

function loginStarted(): Action {
  return { type: AUTH_SIGNIN_REQUEST };
}

function loginSuccess(user: User): Action {
  return { type: AUTH_SIGNIN_SUCCESS, auth: user };
}

function loginFailed(err: string): Action {
  return { type: AUTH_SIGNIN_FAIL, error: err };
}

function logout(): ThunkAction {
  return async dispatch => {
    dispatch({ type: AUTH_SIGNOUT_SUCCESS });
  };
}

module.exports = { login, logout };
