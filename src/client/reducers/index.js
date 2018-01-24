/**
 * @flow
 */

"use strict";

import { combineReducers } from "redux";

module.exports = combineReducers({
  auth: require("./auth"),
  chat: require("./chat")
});
