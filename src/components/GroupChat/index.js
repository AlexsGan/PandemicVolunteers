import React from "react";
import GroupChatEnter from "./GroupChatInput";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box } from "@material-ui/core";
import { Redirect } from "react-router";

import "./styles.css";


/* Component for group chat */
class GroupChat extends React.Component {
  state = {
    message: "",
    messageError: false,
    submitMessage: false,
    redirect: false
  };

  handleChange = event => {
    const target = event.target;
    this.setState({
        [target.name]: target.value
    });
    console.log("handleChange called");
  }

  handleSubmit = event => {
    // BACKEND: Send user message to server and add message in GroupChatInput
    console.log(this.state.message); // added by Alex
    setTimeout(() => {this.setState({submitMessage: true})}, 500);
  }

  render() {
    // if (this.state.submitMessage) {
    //   return <Box>
    //         </Box>
    // }
    if (this.state.redirect) {
      return <Redirect to="/GroupChat/GroupChatInput"/>;
    }
    return (
        <Container className="message-entry" maxWidth="sm">
          <GroupChatEnter 
            message = {this.state.message}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            messageError={this.state.messageError}
          />
        </Container>
    );
  }
}

export default GroupChat;