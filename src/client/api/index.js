/**
 * @flow
 */

"use strict";

import "whatwg-fetch";
import { AuthResponse, Message } from "../types";

export async function login(username: string): Promise<AuthResponse> {
  /*
  let response = await fetch("${HOST}/api/login");
  let data = await response.json();
  */

  let data = {
    success: true,
    user: {
      id: 123456,
      username: username
    }
  };

  if (!data.success) {
    throw new Error("Could not login user ${data.error}");
  }

  return data;
}

export async function sendMessage(
  from: string,
  to: string,
  message: string
): Promise<Message> {
  let data = {
    success: true,
    message: {
      id: Math.floor(Math.random() * 100000000 + 1),
      from: from,
      to: to,
      message: message,
      timestamp: new Date().getTime()
    }
  };

  if (!data.success) {
    throw new Error("Could not send message to user ${to} -> ${data.error}");
  }

  return data.message;
}

export async function loadMessages(
  from: string,
  to: string
): Promise<Array<Message>> {
  let data = {
    success: true,
    messages: [
      {
        id: Math.floor(Math.random() * 100000 + 1),
        from: from,
        to: to,
        message: "Bla blub blub",
        timestamp: new Date().getTime()
      },
      {
        id: Math.floor(Math.random() * 1000000 + 1),
        from: to,
        to: from,
        message: "Blub",
        timestamp: new Date().getTime()
      }
    ]
  };

  if (!data.success) {
    throw new Error("Could not send message to user ${to} -> ${data.error}");
  }

  return data.messages;
}
