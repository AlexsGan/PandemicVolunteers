import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box } from "@material-ui/core";

//import "../styles.css";


/* Component for group chat */
class GroupChatEnter extends React.Component {
  
  render() {
    const {
      message,
      handleChange,
      handleSubmit,
      messageError,
    } = this.props;
    
    return (
        <Container className="message-entry" maxWidth="sm">
          <TextField
            name="message"
            variant="outlined"
            label = "Message to group:"
            value={message}
            onChange={handleChange}
            error={messageError}
            fullWidth
          />

          <Button
            variant="contained"
            onClick={handleSubmit}
            fullWidth
          >
            Post
          </Button>

          <Box className="posted-chats" 
            component="span" 
            display="flex"
            bgcolor="grey.300"
            p={1} 
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum."
          </Box>
          <Box className="posted-chats" 
            component="span" 
            display="flex"
            bgcolor="grey.300"
            p={1} 
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum."
          </Box>
          <Box className="posted-chats" 
            component="span" 
            display="flex"
            bgcolor="grey.300"
            p={1} 
          >
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna 
            aliqua. Ut enim ad minim veniam, quis nostrud exercitation 
            ullamco laboris nisi ut aliquip ex ea commodo consequat. 
            Duis aute irure dolor in reprehenderit in voluptate velit 
            esse cillum dolore eu fugiat nulla pariatur. Excepteur sint 
            occaecat cupidatat non proident, sunt in culpa qui officia 
            deserunt mollit anim id est laborum."
          </Box>
        </Container>
        
    );
  }
    // constructor(props) {
    //     super(props);
    //     this.state = {value: ''};
    
    //     this.handleChange = this.handleChange.bind(this);
    //     this.handleSubmit = this.handleSubmit.bind(this);
    //   }
    
    //   handleChange(event) {
    //     this.setState({value: event.target.value});
    //   }
    
    //   handleSubmit(event) {
    //     alert('Message sent: ' + this.state.value);
    //     event.preventDefault();
    //   }
    
    //   render() {
    //     return (
    //       <form onSubmit={this.handleSubmit}>
    //         <label>
    //           Message to Group:
    //           <input type="text" value={this.state.value} onChange={this.handleChange} />
    //         </label>
    //         <input type="submit" value="Submit" /> 
    //       </form>
    //     );
    //   }
}

export default GroupChatEnter;