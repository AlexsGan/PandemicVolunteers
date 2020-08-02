import React from "react";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";
import { Container, Box, Grid } from "@material-ui/core";
import { Redirect } from "react-router-dom";

import "./styles.css";
import Navbar from "../Navbar";

/* Component for group chat */
class GroupChat extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newMessage: '',
            messageList: []
        }

        this.clearNewMessage = this.clearNewMessage.bind(this)
        this.handleChangeTextbox = this.handleChangeTextbox.bind(this)
        this.changeGroup = this.changeGroup.bind(this)

        this.createTasks = this.createTasks.bind(this)      // post a message
        this.deleteMessage = this.deleteMessage.bind(this) // delete a posted message

        this.onSubmit = this.onSubmit.bind(this)
        this.onCancel = this.onCancel.bind(this)
    }

    clearNewMessage() {
        this.setState({
            newMessage: ''
        })
    }

    handleValidation() {
        if (this.state.newMessage !== '' && this.state.newMessage.length < 500) // post must have 1 < Character < 500
            return true
        alert("Invalid message length!")
        return false
    }

    handleChangeTextbox(e) {
        this.setState({
            newMessage: e.target.value
        })
    }

    changeGroup(key) { // backend will load data from the new group specified

    }

    createTasks(item) { // output message
        if (this.props.location.state.userObject == null) {
            alert("You must be a registered user")
            return
        }
        return <Box>
            <br/>
            <br/>
            <Grid container spacing={1}>
                <Grid item xs={2}>
                    <Box
                        bgcolor="grey.300"
                        borderRadius={20}
                    >
                        <b>{this.props.location.state.userObject.username}</b>
                    </Box>
                </Grid>
                <Grid item xs={8}>
                    <Box
                        component="span"
                        display="flex"
                        bgcolor="grey.300"
                        borderRadius={10}
                        p={1}
                    >
                        {item.text}{""}
                    </Box>
                    <Button
                        variant="outlined"
                        onClick={() => this.deleteMessage(item.key)}
                    >
                        Delete msg
                    </Button>
                    <Box
                        style={{ float: "right" }}
                    >
                        {item.date}
                    </Box>
                </Grid>
            </Grid>
        </Box>
    }

    deleteMessage(key) {
        // if (admin) then delete message
        if (this.props.location.state.userObject == null) {
            alert("You must be a registered user")
            return
        }
        if (this.props.location.state.userObject.isAdmin) {
            const filteredMessageList = this.state.messageList.filter(function (item) {
                return (item.key !== key);
            });

            this.setState({
                messageList: filteredMessageList
            });
        } else {
            alert("must be admin to delete posts")
        }
    }

    onSubmit(e) {
        e.preventDefault();
        if (this.handleValidation()) {
            //alert("Form submit")
            const date = new Date().getDate(); //Current Date
            const month = new Date().getMonth() + 1; //Current Month
            const year = new Date().getFullYear(); //Current Year
            const hours = new Date().getHours(); //Current Hours
            const min = new Date().getMinutes(); //Current Minutes
            const sec = new Date().getSeconds(); //Current Seconds

            const newItem = {
                text: this.state.newMessage,
                key: Date.now(),
                date: date + '/' + month + '/' + year + ' ' + hours + ':' + min + ':' + sec,
            };
            this.setState({
                messageList: [newItem, ...this.state.messageList],
            });
            this.clearNewMessage()
        }
    }

    onCancel(e) {
        e.preventDefault()
        //alert("Cancel")
        this.clearNewMessage()
    }

    render() {
        if (this.state.redirect) {
            return <Redirect to="/group-chat/input"/>;
        }
        return (
            <div>
                <Navbar
                    userObject={this.props.location.state.userObject}
                    currentPath={this.props.location.pathname}
                />
                <Grid className="messages-grid">
                    <Grid item xs="2"/>
                    <Grid item xs="7">
                        <Container className="group-chat-box" maxWidth="md">
                            <Container className="message-entry" maxWidth="sm">
                                <Grid className="messages-grid" container spacing={2}>
                                    <Grid item xs={12}>
                                        <TextField
                                            name="message"
                                            variant="outlined"
                                            label="Message to group:"
                                            value={this.state.newMessage}
                                            onChange={this.handleChangeTextbox}
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            onClick={this.onSubmit}
                                            fullWidth
                                            color="primary"
                                        >
                                            Message
                                        </Button>
                                    </Grid>
                                    <Grid item xs={4}>
                                        <Button
                                            variant="contained"
                                            onClick={this.onCancel}
                                            fullWidth
                                        >
                                            Cancel
                                        </Button>
                                    </Grid>
                                </Grid>
                            </Container>
                            <Container className="message-entry" maxWidth="md">
                                {/* output new message */}
                                {this.state.messageList.map(this.createTasks)}
                                {/* the Box below is hardcoded: will be removed when back-end is implemented */}
                                {/* <Box
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
                  </Box> */}
                            </Container>


                        </Container>
                    </Grid>

                    {/* the groups below will be loaded from backend that stores user's groups */}
                    <Grid item xs="2">
                        <Container
                            display="flex"
                        >
                            <br/>
                            <Button
                                variant="contained"
                                onClick={this.changeGroup}
                                fullWidth
                                color="primary"
                            >
                                Group 1
                            </Button>
                            <br/>
                            <br/>
                            <Button
                                variant="contained"
                                onClick={this.changeGroup}
                                fullWidth
                                color="primary"
                            >
                                Group 2
                            </Button>
                        </Container>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

export default GroupChat;