import React from "react";
import { connect } from "react-redux";
import { TextField, FlatButton } from "material-ui";
import { Card, CardTitle, CardText, CardActions } from "material-ui/Card";

import { login } from "../actions";
import { bindActionCreators } from "redux";
import { ApplicationState } from "../types/index";

type Props = {
  loggedIn: boolean,
  navigation: any,
  error: Error
};

class SignIn extends React.Component<Props> {
  signIn() {
    console.log(this);
    const username = document.getElementById("username").value;
    if (username && username.length > 0) {
      this.props.login(username);
    }
  }

  render() {
    return (
      <div style={{ display: "flex", marginTop: "32px" }}>
        <div style={{ flex: 1 }} />
        <div style={{ width: "400px" }}>
          <Card>
            <CardTitle title="Welcome" />
            <CardText>
              To start chat, please choose your name in the room.
              <TextField
                id="username"
                hintText="E.g. Alice, Bob, ..."
                floatingLabelText="Username"
              />
            </CardText>
            <CardActions>
              <FlatButton label="Start" onClick={ () => { this.signIn(); } } />
            </CardActions>
          </Card>
        </div>
        <div style={{ flex: 1 }} />
      </div>
    );
  }
}

/** Map redux state to props **/
function mapStateToProps(state: ApplicationState) {
  return { loggedIn: state.auth.isLoggedIn };
}

const mapDispatchToProps = dispatch => {
  return bindActionCreators({ login }, dispatch);
};

/** Exports **/
export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
