/**
 * @flow
 */

"use strict";

import { Message, User } from "../types";
import { Action, MESSAGE_RECEIVE } from "../actions/types";

export type State = {
  messages: Array<Message>,
  error: ?string
};

const initialState = {
  messages: [],
  error: null
};

/** Reducers **/
function chat(state: State = initialState, action: Action): State {
  switch (action.type) {
      case MESSAGE_RECEIVE:
      return {
        ...state,
        messages: [...state.messages, action.message]
      };
    default:
      return state;
  }
}

/** Exports **/
module.exports = chat;
