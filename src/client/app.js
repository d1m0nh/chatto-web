/**
 * @flow
 */

"use strict";

import React, { Component, PropTypes } from "react";
import { connect } from "react-redux";
import { AppBar, FlatButton } from "material-ui";
import { SignIn, Room } from "./views";
import { ApplicationState } from "./types";
import { bindActionCreators } from "redux";
import { logout } from "./actions/auth";

type Props = {
  username: ?string
};

/** App Component **/
class App extends Component<Props> {
  render() {
    const { username } = this.props;
    let body, right;
    if (username) {
      body = <Room />;
      right = <FlatButton label="Logout" onTouchTap={this.props.logout()} />;
    } else {
      body = <SignIn />;
    }

    return (
      <div>
        <AppBar title="Chat" iconElementRight={right} />
        {body}
      </div>
    );
  }
}

/** Map redux state to props **/
function mapStateToProps(state: ApplicationState) {
  return { username: state.auth.username };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ logout }, dispatch);
};

/** Exports **/
export default connect(mapStateToProps, mapDispatchToProps)(App);
