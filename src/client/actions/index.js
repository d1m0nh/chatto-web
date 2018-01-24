"use strict";

import * as authActions from "./auth";
import * as chatActions from "./chat";

module.exports = {
  ...authActions,
  ...chatActions
};
