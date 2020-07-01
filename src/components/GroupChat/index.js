import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box, GridList } from "@material-ui/core";
import { Redirect } from "react-router";

import "./styles.css";


/* Component for group chat */
class GroupChat extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      newMessage: '',
      messageList: []
    }

    this.clearData = this.clearData.bind(this)
    this.handleChangeTextbox = this.handleChangeTextbox.bind(this)
    this.onSubmit = this.onSubmit.bind(this)
    this.onCancel = this.onCancel.bind(this)
  }
  // state = {
  //   date : '', 
  //   messageValue: '',
  // };

  // // componentDidMount() {
  // //   var that = this;
  // //   var date = new Date().getDate(); //Current Date
  // //   var month = new Date().getMonth() + 1; //Current Month
  // //   var year = new Date().getFullYear(); //Current Year
  // //   var hours = new Date().getHours(); //Current Hours
  // //   var min = new Date().getMinutes(); //Current Minutes
  // //   var sec = new Date().getSeconds(); //Current Seconds
  // //   that.setState({
  // //     //Setting the value of the date time
  // //     date:
  // //       date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
  // //   });
  // // }

  // submitChar = newMessage => {
  //   this.setState({
  //     submitChar: newMessage
  //   });
  // };

  // submitMessage = newMessage => {
  //   this.setState({
  //     messageList: [newMessage, ...this.state.messageList],
  //   });
  //   this.clearData()
  // };

  // clearData(){
  //   this.setState({
  //     value: ''
  //   })
  // }

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     submitChar: null,
  //     messageList: []
  //   };
  // }

  clearData(){
    this.setState({
      newMessage: ''
    })
  }

  handleValidation(){
    if (this.state.newMessage != '' && this.state.newMessage.length < 500) // post must have 1 < Character < 500
      return true
    alert("Invalid message length!")
    return false
  }

  handleChangeTextbox(e){
    this.setState({
      newMessage: e.target.value
    })
  }

  onSubmit(e){
    e.preventDefault();
    if(this.handleValidation()){
      //alert("Form submit")
      this.setState({
             messageList: [this.state.newMessage, ...this.state.messageList],
           });
      this.clearData()
    }
  }

  onCancel(e){
    e.preventDefault()
    //alert("Cancel")
    this.clearData()
  }

  render() {
    if (this.state.redirect) {
      return <Redirect to="/GroupChat/GroupChatInput"/>;
    }
    return (
        <Container className="group-chat-box" maxWidth="md">
          <Container className="message-entry" maxWidth="sm">
            <TextField 
                name="message"
                variant="outlined"
                label = "Message to group:"
                value={this.state.newMessage} 
                onChange={this.handleChangeTextbox}
                fullWidth
            />

            <Button 
              variant="contained" 
              onClick={this.onSubmit}
              fullWidth 
            >
              Post
            </Button>

            <Button 
              variant="contained" 
              onClick={this.onCancel}
              fullWidth 
            >
              Cancel
            </Button>
            <Container className="message-entry" maxWidth="sm">

            {this.state.messageList.map((item, index) => ( // output message
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
              </Box>

              </Container>
          </Container>
        </Container>
    );
  }
}

export default GroupChat;