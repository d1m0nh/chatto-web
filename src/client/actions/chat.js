/**
 * @flow
 */

"use strict";

import {
  Action,
  MESSAGE_RECEIVE,
  SEND_MESSAGE_REQUEST,
  ThunkAction
} from "./types";

import { Message } from "../types";

/** SEND MESSAGE **/

export function sendMessage(message: string): ThunkAction {
  return async dispatch => {
    dispatch(sendMessageStarted(message));
  };
}

function sendMessageStarted(text: string): Action {
  return { type: SEND_MESSAGE_REQUEST, text: text };
}

/** RECEIVE MESSAGES **/

export function receivedMessage(message: Message): Action {
  return { type: MESSAGE_RECEIVE, message: message };
}
