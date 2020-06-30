import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box } from "@material-ui/core";
import { Redirect } from "react-router";

import "./styles.css";


/* Component for group chat */
class GroupChat extends React.Component {

  state = {
    date : '', 
  };

  // componentDidMount() {
  //   var that = this;
  //   var date = new Date().getDate(); //Current Date
  //   var month = new Date().getMonth() + 1; //Current Month
  //   var year = new Date().getFullYear(); //Current Year
  //   var hours = new Date().getHours(); //Current Hours
  //   var min = new Date().getMinutes(); //Current Minutes
  //   var sec = new Date().getSeconds(); //Current Seconds
  //   that.setState({
  //     //Setting the value of the date time
  //     date:
  //       date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
  //   });
  // }

  setCurrentToDoItem = toDoItem => {
    this.setState({
      currentToDoItem: toDoItem
    });
  };

  saveToDoListItem = toDoItem => {
    this.setState({
      toDoList: [toDoItem, ...this.state.toDoList],
    });
  };

  constructor(props) {
    super(props);

    this.state = {
      currentToDoItem: null,
      toDoList: []
    };
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
        <Container>
          <Container className="message-entry" maxWidth="sm">
            <TextField 
                name="message"
                variant="outlined"
                label = "Message to group:"
                onChange={event => this.setCurrentToDoItem(event.target.value)} 
                fullWidth
            />
            <Button 
              variant="contained" 
              onClick={() => this.saveToDoListItem(this.state.currentToDoItem)}
              fullWidth 
            >
              Post
            </Button>

            {this.state.toDoList.map((item, index) => (
              <Box>
              <Box 
                className="posted-chats" 
                component="span" 
                display="flex"
                bgcolor="grey.300"
                p={1} 
              > 
                {item}{""}
              </Box>
              {/* <Box className="message-time">
                {this.state.date}
              </Box> */}
              </Box>
            ))}
          </Container>
        </Container>
    );
  }
}

export default GroupChat;