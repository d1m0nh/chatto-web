"use strict";
import { User, Message } from "../types";

export const AUTH_SIGNOUT_SUCCESS = "AUTH_SIGNOUT_SUCCESS";

export const AUTH_SIGNIN_REQUEST = "AUTH_SIGNIN_REQUEST";
export const AUTH_SIGNIN_SUCCESS = "AUTH_SIGNIN_SUCCESS";
export const AUTH_SIGNIN_FAIL = "AUTH_SIGNIN_FAIL";

export const SEND_MESSAGE_REQUEST = "SEND_MESSAGE_REQUEST";

export const MESSAGE_RECEIVE = "MESSAGE_RECEIVE";

export const LOAD_USER_LIST = "LOAD_USER_LIST";
export const LOAD_USER_LIST_SUCCESS = "LOAD_USER_LIST_SUCCESS";
export const LOAD_USER_LIST_FAIL = "LOAD_USER_LIST";

export type Action =
  /** Authentication actions **/
  | {
      type: AUTH_SIGNIN_REQUEST
    }
  | {
      type: AUTH_SIGNIN_SUCCESS,
      user: User
    }
  | {
      type: AUTH_SIGNIN_FAIL,
      error: string
    }
  | {
      type: AUTH_SIGNOUT_SUCCESS
    }
  /** Chat actions **/
  | {
      type: SEND_MESSAGE_REQUEST,
      text: string
    }
  | {
      type: MESSAGE_RECEIVE,
      messages: Array<Message>
    }
  /** User List actions **/
  | { type: LOAD_USER_LIST }
  | {
      type: LOAD_USER_LIST_SUCCESS,
      users: Array<string>
    }
  | {
      type: LOAD_USER_LIST_FAIL,
      error: string
    };

export type Dispatch = (
  action: Action | ThunkAction | PromiseAction | Array<Action>
) => any;

export type GetState = () => Object;
export type ThunkAction = (dispatch: Dispatch, getState: GetState) => any;
export type PromiseAction = Promise<Action>;
