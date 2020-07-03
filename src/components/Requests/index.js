import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box, Grid, MenuItem } from "@material-ui/core";
import { Redirect } from "react-router";

import "./styles.css";
import Navbar from "../LandingView/Navbar";
import GroupChat from "../GroupChat";

/* Component for Requests */
class Requests extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      newMessage: '',
      // city: '',
      // cityList: [],
      // province: '',
      messageList: [],
      redirect: false,
    }

    this.clearData = this.clearData.bind(this)
    this.handleChangeTextbox = this.handleChangeTextbox.bind(this)
    this.assistRequest = this.assistRequest.bind(this)
    // this.handleChangeCity = this.handleChangeCity.bind(this)
    // this.handleChangeProvince = this.handleChangeProvince.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }

  clearData() {
    this.setState({
      newMessage: '',
      city: '',
      province: '',
    })
  }

  handleValidation() {
    if (this.state.newMessage != '' && this.state.newMessage.length < 500) // post must have 1 < Character < 500
      return true
    alert("Invalid message length!")
    return false
  }

  handleChangeTextbox(e) {
    this.setState({
      newMessage: e.target.value
    })
  }

  assistRequest(e) {
    e.preventDefault();
    this.setState({
      redirect: true
    })
  }

  onSubmit(e) {
    e.preventDefault();
    if (this.handleValidation()) {
      //alert("Form submit")
      this.setState({
        messageList: [this.state.newMessage, ...this.state.messageList],
      });
      this.clearData()
    }
  }

  onCancel(e) {
    e.preventDefault()
    //alert("Cancel")
    this.clearData()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/GroupChat"/>;
    }
    return (
      <div>
        <Navbar />
        <Container className="requests-box" maxWidth="lg">
          <Container className="requests-container" maxWidth="md">
            <Grid className="requests-grid" container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  multiline={true}
                  rows={3}
                  name="message"
                  variant="outlined"
                  label="Add a request:"
                  value={this.state.newMessage}
                  onChange={this.handleChangeTextbox}
                  fullWidth
                />
              </Grid>

              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={this.onSubmit}
                  color="primary"
                >
                  Post
                </Button>
              </Grid>
              <Grid item xs={3}>
                <Button
                  variant="contained"
                  onClick={this.onCancel}
                >
                  Cancel
                </Button>
              </Grid>
            </Grid>

            {this.state.messageList.map((item, index) => ( // add requests 
              <Box>
                <Box
                  className="posted-chats"
                  component="span"
                  display="flex"
                  bgcolor="grey.300"
                  borderRadius={10}
                  p={1}
                >
                  {item}{""}
                  <Button
                    onClick={this.assistRequest}
                    color="primary"
                  >
                    Assist Now
                  </Button>
                </Box>
                {/* <Box className="message-time">
                {this.state.date}
              </Box> */}
              </Box>
            ))}

            {/* the Box below is hardcoded: will be removed when back-end is implemented */}

            <Box
              className="posted-chats"
              component="span"
              display="flex"
              bgcolor="grey.300"
              borderRadius={10}
              p={1}
            >
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt
              ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation
              ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
              reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
              sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              <Button
                onClick={this.assistRequest}
                color="primary"
              >
                Assist Now
              </Button>
            </Box>

          </Container>
        </Container>
      </div>
    );
  }
}

export default Requests;