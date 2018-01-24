import io from "socket.io-client";
import { eventChannel } from "redux-saga";
import { fork, take, call, put, cancel } from "redux-saga/effects";

import {
  AUTH_SIGNIN_SUCCESS,
  AUTH_SIGNOUT_SUCCESS,
  SEND_MESSAGE_REQUEST
} from "./actions/types";
import { receivedMessage } from "./actions/chat";

function connect() {
  const socket = io("http://localhost:3000");
  return new Promise(resolve => {
    socket.on("connect", () => {
      resolve(socket);
    });
  });
}

function subscribe(socket) {
  return eventChannel(emit => {
    socket.on("users.login", ({ username }) => {
      //emit(addUser({ username }));
    });
    socket.on("users.logout", ({ username }) => {
      //emit(removeUser({ username }));
    });
    socket.on("messages.new", ({ message }) => {
      emit(receivedMessage({ message }));
    });
    socket.on("disconnect", e => {
      // TODO: handle
    });
    return () => {};
  });
}

function* read(socket) {
  const channel = yield call(subscribe, socket);
  while (true) {
    let action = yield take(channel);
    yield put(action);
  }
}

function* write(socket) {
  while (true) {
    const state = yield take(SEND_MESSAGE_REQUEST);
    const text = state.text;
    socket.emit("message", { text: text });
  }
}

function* handleIO(socket) {
  yield fork(read, socket);
  yield fork(write, socket);
}

function* flow() {
  while (true) {
    let state = yield take(AUTH_SIGNIN_SUCCESS);
    const socket = yield call(connect);
    socket.emit("login", { username: state.auth.user.username });

    const task = yield fork(handleIO, socket);

    let action = yield take(AUTH_SIGNOUT_SUCCESS);
    yield cancel(task);
    socket.emit("logout");
  }
}

export default function* rootSaga() {
  yield fork(flow);
}
