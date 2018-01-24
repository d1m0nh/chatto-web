import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { List, ListItem } from "material-ui/List";

import { sendMessage } from "../actions";
import Elm from "react-elm-components";
import { ChatUsers, ChatInput } from "../elm-components/elm";
import { ApplicationState } from "../types/index";

type Props = {
  messages: Array<Message>
};

class Room extends Component<Props> {
  render() {
    function setupPorts(ports) {
      ports.message.subscribe(text => {
        this.props.dispatch(sendMessage(text));
      });
    }

    const { messages } = this.props;

    return (
      <div style={{ display: "flex" }}>
        <div style={{ width: "400px" }}>
          <Elm src={ChatUsers} />
        </div>
        <div style={{ flex: 1 }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              minHeight: "100vh"
            }}
          >

            <div style={{ flex: 1, border: 2 }}>

              <List>
                {messages.map(({ message }) => {
                  const { text, username, id } = message;
                  return (
                    <ListItem
                      primaryText={text}
                      secondaryText={username}
                      key={id}
                    />
                  );
                })}
              </List>
            </div>

            <div style={{ height: "120px" }}>
              <div style={{ display: "flex" }}>
                <Elm src={ChatInput} ports={setupPorts.bind(this)} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

/** Map redux state to props **/
function mapStateToProps(state: ApplicationState) {
  return { messages: state.chat.messages };
}

export default connect(mapStateToProps)(Room);
